#!/usr/bin/env python3
"""
Project Cleanup Script for Cleared Advisory
This script helps organize and clean up temporary files
"""

import os
import shutil
from pathlib import Path
import argparse

def create_organized_structure():
    """Create organized folder structure"""
    base_path = Path("/Users/tone/cleared-advisory")
    
    # Define the organized structure
    folders = {
        "_archive": "Old and temporary files",
        "_docs": "Documentation and guides", 
        "_scripts": "Python scripts and utilities",
        "_audits": "Website audits and screenshots",
        "_prompts": "AI prompts and brainstorming"
    }
    
    # Create folders
    for folder, desc in folders.items():
        folder_path = base_path / folder
        folder_path.mkdir(exist_ok=True)
        print(f"✓ Created {folder}: {desc}")
    
    return folders

def organize_files():
    """Move files to appropriate folders"""
    base_path = Path("/Users/tone/cleared-advisory")
    
    # File organization rules
    moves = {
        "_scripts": [
            "*.py",
            "push-to-github.sh"
        ],
        "_audits": [
            "Cleared_Advisory_Website_Audit*",
            "website_audit_*",
            "extract_frames.py",
            "capture_website_screenshots*.py",
            "update_word_doc_with_screenshots.py",
            "create_word_doc_with_screenshots*.py",
            "convert_audit_to_docs.py"
        ],
        "_docs": [
            "*_ROADMAP.md",
            "*_DETAILS.md", 
            "*_STACK.md",
            "*_TASKS.md",
            "*-guide.md",
            "*-journey.md",
            "website-design.md",
            "HOMEPAGE_INTEGRATION_GUIDE.md"
        ],
        "_prompts": [
            "BRAINSTORM.md",
            "*_prompt.md",
            "claude_code_prompt.md",
            "recruiter_dashboard_*.md"
        ]
    }
    
    moved_count = 0
    
    for folder, patterns in moves.items():
        folder_path = base_path / folder
        for pattern in patterns:
            for file in base_path.glob(pattern):
                if file.is_file() and file.parent == base_path:
                    dest = folder_path / file.name
                    shutil.move(str(file), str(dest))
                    print(f"  → Moved {file.name} to {folder}/")
                    moved_count += 1
    
    return moved_count

def update_gitignore():
    """Update .gitignore with proper entries"""
    base_path = Path("/Users/tone/cleared-advisory")
    gitignore_path = base_path / ".gitignore"
    
    gitignore_content = """# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
*.test.js

# Production
build/
dist/
.next/
out/

# Misc
.DS_Store
*.pem
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
*.temp
*.log

# Archive folders
_archive/
_old/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python

# Screenshots and media
*.png
*.jpg
*.jpeg
*.mp4
!public/**/*

# Word docs and PDFs
*.docx
*.pdf

# Backup files
*.backup
*.bak
"""
    
    with open(gitignore_path, 'w') as f:
        f.write(gitignore_content)
    
    print("✓ Updated .gitignore file")

def create_project_readme():
    """Create a main project README"""
    base_path = Path("/Users/tone/cleared-advisory")
    readme_path = base_path / "PROJECT_STRUCTURE.md"
    
    readme_content = """# Cleared Advisory Project Structure

## 📁 Active Project
- **cleared-advisory-nextjs/**: Main Next.js application
  - Live at: https://cleared-advisory-group-website.vercel.app/

## 📂 Organization
- **_archive/**: Temporary and old files
- **_docs/**: Documentation and guides
- **_scripts/**: Python scripts and utilities
- **_audits/**: Website audits and analysis
- **_prompts/**: AI prompts and brainstorming

## 🚀 Quick Start
```bash
cd cleared-advisory-nextjs
npm install
npm run dev
```

## 🔧 Useful Scripts
- `cleanup_project.py`: Organize project files
- Scripts in `_scripts/` folder for various utilities

## 📝 Notes
- Main development happens in `cleared-advisory-nextjs/`
- Use organized folders to keep root directory clean
- Check `_docs/` for guides and documentation
"""
    
    with open(readme_path, 'w') as f:
        f.write(readme_content)
    
    print("✓ Created PROJECT_STRUCTURE.md")

def archive_duplicate_project():
    """Archive the duplicate cleared-advisory folder"""
    base_path = Path("/Users/tone/cleared-advisory")
    duplicate = base_path / "cleared-advisory"
    archive = base_path / "_archive" / "cleared-advisory-old"
    
    if duplicate.exists():
        shutil.move(str(duplicate), str(archive))
        print("✓ Archived duplicate cleared-advisory folder")

def main():
    parser = argparse.ArgumentParser(description="Clean up and organize Cleared Advisory project")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be done without doing it")
    args = parser.parse_args()
    
    print("🧹 Cleaning up Cleared Advisory project...\n")
    
    # Create organized structure
    create_organized_structure()
    print()
    
    # Organize files
    print("📁 Organizing files...")
    moved = organize_files()
    print(f"\n✓ Moved {moved} files to organized folders\n")
    
    # Update gitignore
    update_gitignore()
    
    # Create project readme
    create_project_readme()
    
    # Archive duplicate folder
    archive_duplicate_project()
    
    print("\n✅ Project cleanup complete!")
    print("\nYour main project is in: cleared-advisory-nextjs/")
    print("Check PROJECT_STRUCTURE.md for the new organization")

if __name__ == "__main__":
    main()