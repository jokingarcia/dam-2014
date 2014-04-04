<?php
//id, user, date, text
$tweets["01"] = "tweet1";
$tweets["02"] = "tweet2";
$tweets["03"] = "tweet3";
$tweets["04"] = "tweet4";
$tweets["33"] = "tweet5";




foreach($tweets as $codigo => $nombre) {
  $elementos_json[] = "\"$codigo\": \"$nombre\"";
}

echo "{".implode(",", $elementos_json)."}"

?>
