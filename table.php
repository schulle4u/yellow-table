<?php
// Table extension, https://github.com/schulle4u/yellow-table

class YellowTable {
    const VERSION = "0.9.1";
    public $yellow;         //access to API
    
    // Handle initialisation
    public function onLoad($yellow) {
        $this->yellow = $yellow;
        $this->yellow->system->setDefault("tableDirectory", "media/downloads/");
        $this->yellow->system->setDefault("tableDelimiter", "auto");
        $this->yellow->system->setDefault("tableFirstRowHeader", "1");
        $this->yellow->system->setDefault("tableFunctions", "1");
        $this->yellow->system->setDefault("tableRowsPerPage", "0");
    }
    
    // Handle page content element
    public function onParseContentElement($page, $name, $text, $attributes, $type) {
        $output = null;
        if ($name=="table" && ($type=="block" || $type=="inline")) {
            list($fileName, $rowsPerPage, $class) = $this->yellow->toolbox->getTextArguments($text);
            $fileName = $this->yellow->lookup->normalisePath($this->yellow->system->get("tableDirectory").$fileName);
            $fileData = $this->yellow->toolbox->readFile($fileName);
            if (is_string_empty($rowsPerPage)) $rowsPerPage = $this->yellow->system->get("tableRowsPerPage");
            if (!is_string_empty($fileData)) {
                $output = "<div class=\"".htmlspecialchars($name)."-container\" style=\"overflow-x:auto;\">\n";
                $output .= $this->getTableHtml($fileData, $rowsPerPage, $class);
                $output .= "</div>\n";
            } else {
                $this->yellow->page->error(500, "Table '$fileName' does not exist!");
            }
        }
        if ($name=="table" && $type=="code") {
            $htmlAttributes = $this->yellow->lookup->getHtmlAttributes(".table $attributes");
            if (!is_string_empty($text)) {
                $output = "<div".$htmlAttributes;
                $output .= " style=\"overflow-x:auto;\">\n";
                $output .= $this->getTableHtml($text, $rowsPerPage, $class);
                $output .= "</div>\n";
            }
        }
        return $output;
    }
    
    // Handle page extra data
    public function onParsePageExtra($page, $name) {
        $output = null;
        if ($name=="header" && $this->yellow->system->get("tableFunctions")) {
            $assetLocation = $this->yellow->system->get("coreServerBase").$this->yellow->system->get("coreAssetLocation");
            $output .= "<script type=\"text/javascript\" defer=\"defer\" src=\"{$assetLocation}table.js\"></script>\n";
        }
        return $output;
    }
    
    // Return table data, HTML encoded
    public function getTableHtml($fileData, $rowsPerPage, $class) {
        $output = "";
        $class = trim("csv-table $class");
        $tableFunctions = $this->yellow->system->get("tableFunctions") ? "true" : "false";
        if (is_string_empty($rowsPerPage)) $rowsPerPage = $this->yellow->system->get("tableRowsPerPage");
        $output .= "<table class=\"".htmlspecialchars($class)."\" data-tableFunctions=\"".htmlspecialchars($tableFunctions)."\" data-rowsPerPage=\"".htmlspecialchars($rowsPerPage)."\">\n";
        $row = $this->yellow->system->get("tableFirstRowHeader") ? 0 : 1;
        $delimiter = $this->getTableDelimiter($fileData);
        foreach ($this->yellow->toolbox->getTextLines($fileData) as $line) {
            $data = str_getcsv($line, $delimiter);
            if ($row==0) {
                $output .= "<thead><tr>\n";
            } else {
                $output .= "<tr>\n";
            }
            for ($column=0; $column<count($data); ++$column) {
                $value = trim($data[$column]);
                if ($row==0) {
                    $output .= "<th>".$value."</th>\n";
                } else {
                    $output .= "<td>".$value."</td>\n";
                }
            }
            if ($row==0) {
                $output .= "</tr></thead>\n";
            } else {
                $output .= "</tr>\n";
            }
            ++$row;
        }
        $output .= "</table>\n";
        return $this->yellow->lookup->normaliseData($output, "html");
    }
    
    // Return table delimiter
    public function getTableDelimiter($fileData) {
        $delimiter = $this->yellow->system->get("tableDelimiter");
        if ($delimiter=="auto") {
            $line = substru($fileData, 0, strposu($fileData, "\n"));
            $delimiterData = array(","=>0, ";"=>0, "|"=>0, "\t"=>0);
            foreach ($delimiterData as $key=>$value) {
                $delimiterData[$key] = substr_count($line, $key);
            }
            arsort($delimiterData);
            $delimiter = array_keys($delimiterData)[0];
        } else {
            $delimiter = str_replace("\\t", "\t", $delimiter);
        }
        return $delimiter;
    }
}
