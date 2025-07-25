#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import os
from datetime import datetime

async def capture_screenshots():
    """Capture screenshots of different sections of the Cleared Advisory website with better loading handling"""
    
    # Create screenshots directory
    screenshot_dir = "website_audit_screenshots_v2"
    os.makedirs(screenshot_dir, exist_ok=True)
    
    async with async_playwright() as p:
        # Launch browser with more options
        browser = await p.chromium.launch(
            headless=False,  # Set to False to see what's happening
            args=['--disable-blink-features=AutomationControlled']
        )
        
        # Desktop viewport
        desktop_context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            device_scale_factor=1,
        )
        desktop_page = await desktop_context.new_page()
        
        # Mobile viewport
        mobile_context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            device_scale_factor=2,
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
        )
        mobile_page = await mobile_context.new_page()
        
        url = "https://cleared-advisory-group-website.vercel.app/"
        
        print("Navigating to website...")
        
        # Navigate and wait for full load
        await desktop_page.goto(url, wait_until='networkidle')
        await mobile_page.goto(url, wait_until='networkidle')
        
        # Extra wait for dynamic content
        print("Waiting for content to fully render...")
        await desktop_page.wait_for_timeout(5000)
        await mobile_page.wait_for_timeout(5000)
        
        # Scroll to load lazy content
        await desktop_page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await desktop_page.wait_for_timeout(2000)
        await desktop_page.evaluate("window.scrollTo(0, 0)")
        await desktop_page.wait_for_timeout(1000)
        
        # Capture full page screenshots
        print("Capturing full page screenshots...")
        await desktop_page.screenshot(
            path=f"{screenshot_dir}/01_homepage_full_desktop.png",
            full_page=True
        )
        
        await mobile_page.screenshot(
            path=f"{screenshot_dir}/01_homepage_full_mobile.png",
            full_page=True
        )
        
        # Capture specific sections with better selectors
        sections = [
            ('header', ['nav', 'header', '[role="navigation"]', '.navigation', '.header']),
            ('hero', ['[class*="hero"]', 'section:first-of-type', 'main > section:first-child', '.banner']),
            ('services', ['[class*="service"]', '[class*="feature"]', 'section:has(h2:text-matches("service", "i"))']),
            ('target_audience', ['[class*="audience"]', '[class*="target"]', 'section:has(h2:text-matches("audience|member", "i"))']),
            ('process', ['[class*="process"]', '[class*="journey"]', 'section:has(h2:text-matches("process|journey", "i"))']),
            ('mock_interview', ['[class*="mock"]', '[class*="interview"]', 'section:has(h2:text-matches("mock|interview", "i"))']),
            ('testimonials', ['[class*="testimonial"]', '[class*="success"]', '[class*="stories"]', 'section:has(h2:text-matches("testimonial|success|stories", "i"))']),
            ('footer', ['footer', '[role="contentinfo"]', '.footer'])
        ]
        
        for name, selectors in sections:
            captured = False
            for selector in selectors:
                try:
                    # Try to find element with each selector
                    element = await desktop_page.query_selector(selector)
                    if element:
                        # Scroll element into view
                        await element.scroll_into_view_if_needed()
                        await desktop_page.wait_for_timeout(1000)
                        
                        # Take screenshot
                        await element.screenshot(path=f"{screenshot_dir}/02_{name}_desktop.png")
                        print(f"✓ Captured {name} section using selector: {selector}")
                        captured = True
                        break
                except Exception as e:
                    continue
            
            if not captured:
                print(f"✗ Could not capture {name} section - trying viewport screenshot")
                # Take a screenshot of current viewport as fallback
                await desktop_page.screenshot(path=f"{screenshot_dir}/02_{name}_desktop_viewport.png")
        
        # Capture mobile menu
        print("Checking for mobile menu...")
        try:
            # Look for hamburger menu with various selectors
            menu_selectors = [
                'button[aria-label*="menu"]',
                'button:has-text("Menu")',
                '[class*="hamburger"]',
                '[class*="menu-toggle"]',
                'button svg',
                'nav button'
            ]
            
            menu_found = False
            for selector in menu_selectors:
                menu_button = await mobile_page.query_selector(selector)
                if menu_button:
                    await menu_button.click()
                    await mobile_page.wait_for_timeout(1000)
                    await mobile_page.screenshot(
                        path=f"{screenshot_dir}/03_mobile_menu_expanded.png"
                    )
                    print(f"✓ Captured mobile menu using selector: {selector}")
                    menu_found = True
                    break
            
            if not menu_found:
                print("✗ No mobile menu button found")
        except Exception as e:
            print(f"Error capturing mobile menu: {e}")
        
        # Take individual section screenshots by scrolling
        print("\nCapturing sections by scrolling...")
        viewport_height = 1080
        current_position = 0
        section_num = 1
        
        while current_position < await desktop_page.evaluate("document.body.scrollHeight"):
            await desktop_page.evaluate(f"window.scrollTo(0, {current_position})")
            await desktop_page.wait_for_timeout(500)
            
            await desktop_page.screenshot(
                path=f"{screenshot_dir}/04_section_{section_num}_desktop.png"
            )
            print(f"Captured section {section_num}")
            
            current_position += viewport_height * 0.8  # Overlap slightly
            section_num += 1
        
        await browser.close()
        print(f"\nAll screenshots saved to {screenshot_dir}/")
        print("\nNote: Review the captured screenshots. If any are still white/blank:")
        print("1. The website may require authentication")
        print("2. Content may be behind a loading screen")
        print("3. The site may have anti-automation measures")

if __name__ == "__main__":
    asyncio.run(capture_screenshots())