<?php
/*
Plugin Name: Key Shortcut Formatter
Plugin URI: https://github.com/semafor/key-shortcut-formatter
Description: Takes a special DOM class and adds keyboard like graphics 
Version: 0.1
Author: Jonas Grønås Drange
Author URI: http://theorieswithproblems.com
License: GPL v3
*/

function javascript() {
    $plugin_url = trailingslashit( get_bloginfo('wpurl') ).PLUGINDIR.'/'. dirname( plugin_basename(__FILE__) );
    if (!is_admin()) {
        wp_enqueue_script('myscript', $plugin_url . '/js.js');
    }
}

function style() {
    wp_register_style( 'key_shortcut_formatter', plugins_url('style.css', __FILE__) );
    wp_enqueue_style( 'key_shortcut_formatter' );
}

add_action( 'wp_print_scripts', 'javascript' );
add_action( 'wp_enqueue_scripts', 'style' );


?>
