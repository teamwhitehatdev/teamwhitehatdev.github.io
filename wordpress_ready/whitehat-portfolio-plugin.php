<?php
/**
 * Plugin Name: White Hat Dev Cyberpunk Portfolio & Store
 * Plugin URI: https://teamwhitehatdev.github.io
 * Description: Advanced Cyberpunk HUD Portfolio, Marketplace, Apps Showcase & Anti-Inspect Security System for WordPress.
 * Version: 1.2.1
 * Author: TEAM WHITE HAT
 * Author URI: https://teamwhitehatdev.github.io
 */

if (!defined('ABSPATH')) exit;

function whitehat_dev_enqueue_assets() {
    $plugin_url = plugin_dir_url(__FILE__);
    
    // Find index css file inside app/assets
    $assets_dir = plugin_dir_path(__FILE__) . 'app/assets/';
    if (is_dir($assets_dir)) {
        $files = scandir($assets_dir);
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'css') {
                wp_enqueue_style('whitehat-css', $plugin_url . 'app/assets/' . $file, array(), '1.2.1');
            }
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
                wp_enqueue_script('whitehat-js', $plugin_url . 'app/assets/' . $file, array(), '1.2.1', true);
            }
        }
    }
}

function whitehat_dev_portfolio_shortcode() {
    ob_start();
    ?>
    <div id="root" style="min-height: 100vh; background-color: #0b1120;"></div>
    <?php
    return ob_get_clean();
}

add_shortcode('whitehat_dev_portfolio', 'whitehat_dev_portfolio_shortcode');
add_action('wp_enqueue_scripts', 'whitehat_dev_enqueue_assets');
