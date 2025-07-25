#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import os
from datetime import datetime

async def capture_screenshots():
    """Capture screenshots of different sections of the Cleared Advisory website"""
    
    # Create screenshots directory
    screenshot_dir = "website_audit_screenshots"
    os.makedirs(screenshot_dir, exist_ok=True)
    
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch(headless=True)
        
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
        
        # Navigate to the website
        await desktop_page.goto(url, wait_until='networkidle')
        await mobile_page.goto(url, wait_until='networkidle')
        
        # Wait for content to load
        await desktop_page.wait_for_timeout(3000)
        await mobile_page.wait_for_timeout(3000)
        
        # Capture full page screenshots
        await desktop_page.screenshot(
            path=f"{screenshot_dir}/01_homepage_full_desktop.png",
            full_page=True
        )
        
        await mobile_page.screenshot(
            path=f"{screenshot_dir}/01_homepage_full_mobile.png",
            full_page=True
        )
        
        # Capture specific sections on desktop
        sections = [
            ('header', 'nav, header'),
            ('hero', 'section:has-text("Your Gateway to Cleared IT Opportunities")'),
            ('services', 'section:has-text("SECRET+ Cleared Opportunities")'),
            ('target_audience', 'section:has-text("National Guard Members")'),
            ('process', 'section:has-text("Your Journey to Success")'),
            ('mock_interview', 'section:has-text("AI-Powered Mock Interviews")'),
            ('testimonials', 'section:has-text("Success Stories")'),
            ('footer', 'footer')
        ]
        
        for name, selector in sections:
            try:
                element = await desktop_page.wait_for_selector(selector, timeout=5000)
                if element:
                    await element.screenshot(path=f"{screenshot_dir}/02_{name}_desktop.png")
                    print(f"Captured {name} section")
            except:
                print(f"Could not capture {name} section")
        
        # Capture navigation menu (if expandable on mobile)
        try:
            menu_button = await mobile_page.query_selector('button[aria-label*="menu"], button:has-text("Menu")')
            if menu_button:
                await menu_button.click()
                await mobile_page.wait_for_timeout(500)
                await mobile_page.screenshot(
                    path=f"{screenshot_dir}/03_mobile_menu_expanded.png"
                )
        except:
            print("No expandable menu found on mobile")
        
        await browser.close()
        print(f"Screenshots saved to {screenshot_dir}/")

if __name__ == "__main__":
    asyncio.run(capture_screenshots())