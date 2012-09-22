<?php

$sustaination = json_decode(file_get_contents('http://wired4food.air.stevelacey.net/businesses.json'));
$bristolpound = json_decode(file_get_contents('http://wired4food.air.stevelacey.net/bristolpound.json'));

$data = array();

foreach ($bristolpound as $business) {
  $data[$business->name] = $business;
}

$bristolpound = $data;

$data = array();

foreach ($sustaination->data as $business) {
  $business->name = trim($business->name);

  list($latitude, $longitude) = explode(',', $business->location);

  $business->location = (object) array(
    'latitude' => $latitude,
    'longitude' => $longitude
  );

  if (array_key_exists($business->name, $bristolpound)) {
    $business->bristolpound = 'http://bristolpound.org' . $bristolpound[$business->name]->url;

    unset($bristolpound[$business->name]);
  }

  $data[$business->name] = $business;
}

foreach ($bristolpound as $business) {
  $object = (object) array(
    'name' => $business->name,
    'address' => new stdClass,
    'bristolpound' => 'http://bristolpound.org' . $business->url,
  );

  $address = explode(', ', $business->address);

  $object->location = (object) array(
    'latitude' => $business->latitude,
    'longitude' => $business->longitude
  );

  $object->address->postcode = array_pop($address);

  if ($address) { $object->address->line_1 = array_shift($address); }
  if ($address) { $object->address->line_2 = array_shift($address); }
  if ($address) { $object->address->city = array_shift($address); }
  if ($address) { $object->address->county = array_shift($address); }

  $data[$business->name] = $object;
}

echo json_encode(array_values($data));
