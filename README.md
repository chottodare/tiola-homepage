# Universal Bookmark Manager

A clean, universal bookmark manager with profile support, import/export functionality, and a beautiful customizable interface.

## Features

### 🎯 Core Features
- **Universal Template**: Start with a blank slate and add your own bookmarks
- **Profile Management**: Create multiple profiles to organize bookmarks by context (work, personal, etc.)
- **Import/Export**: Backup and restore your bookmarks as JSON files
- **Search Functionality**: Quickly find bookmarks or search directly on Google
- **Categorized Bookmarks**: Organize bookmarks into folders
- **Quick Access**: Pin frequently used sites for instant access
- **Multiple Themes**: Choose from 11 beautiful color themes

### 🔐 Profile System
- Create unlimited profiles
- Each profile has its own set of bookmarks
- Switch between profiles instantly
- Logout returns to default profile
- All data stored locally in your browser

### 💾 Import/Export
- **Export**: Download all your bookmarks as a JSON file
- **Import**: Restore bookmarks from a JSON file
- Includes timestamp for tracking versions
- Profile-specific data preservation

## Getting Started

### First Time Setup

1. Open `index.html` in your web browser
2. You'll see a welcome screen with a few example bookmarks
3. Delete or keep the example bookmarks as needed
4. Start adding your own bookmarks!

### Adding Bookmarks

1. Click the **➕ Add New** button in the quick access section
2. Fill in the bookmark details:
   - **Title**: Name of the bookmark
   - **URL**: Full web address
   - **Category**: Choose existing or create new category
   - **Description**: Optional description
3. Click **Save**

### Managing Profiles

1. Click the **👤 Profile** button in the top right
2. To create/switch profiles:
   - Enter a profile name
   - Click **Switch/Create Profile**
3. To logout (return to Default profile):
   - Click the **Logout** button

### Export Your Bookmarks

1. Click the **💾 Export** button
2. A JSON file will download automatically
3. File name format: `bookmarks_[ProfileName]_[Date].json`

### Import Bookmarks

1. Click the **📂 Import** button
2. Select a previously exported JSON file
3. Your bookmarks will be restored

### Customizing Themes

1. Click the **🎨 Theme** button
2. The theme will cycle through available options:
   - Light High Contrast
   - Default
   - Ocean
   - Sunset
   - Forest
   - Lavender
   - Graphite
   - Mint
   - Cherry Blossom
   - Sandstone
   - Midnight

### Deleting Bookmarks

**Option 1: Context Menu (Desktop)**
- Right-click on any bookmark
- Select **Delete** from the menu

**Option 2: Swipe (Mobile)**
- Swipe left on a bookmark
- Tap the 🗑️ button that appears

## Data Storage

All data is stored locally in your browser using `localStorage`:
- Bookmarks are saved automatically
- Each profile has separate storage
- No data is sent to any server
- Data persists between sessions

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Customization

The bookmark manager can be easily customized:

### Adding Example Bookmarks

Edit the `initialBookmarks` array in `index.html`:

```javascript
const initialBookmarks = [
    { 
        folder: "Category Name", 
        title: "Site Title", 
        url: "https://example.com", 
        description: "Description here" 
    },
    // Add more bookmarks...
];
```

### Adding Quick Access Links

Edit the `quickAccessLinks` array:

```javascript
const quickAccessLinks = [
    { title: "LABEL", url: "https://example.com" },
    // Add more quick links...
];
```

### Customizing Categories

Categories are created automatically when you add bookmarks. You can pre-define category colors in the `categoryColors` object.

## Tips & Tricks

1. **Search Feature**: Type in the search box and press Enter to search bookmarks or Google
2. **Exact Match**: If you type an exact bookmark title, it will open directly
3. **Categories**: Click category headers to expand/collapse them
4. **Backup Regularly**: Export your bookmarks periodically as backup
5. **Multiple Profiles**: Use profiles for different contexts (work, study, hobbies)

## Privacy & Security

- ✅ No data collection
- ✅ No external servers
- ✅ All data stored locally
- ✅ No tracking or analytics
- ✅ Open source - audit the code yourself

## Fork & Customize

This is designed to be forked and customized:

1. Fork this repository
2. Modify the initial bookmarks to your needs
3. Customize colors, themes, and layout
4. Host on GitHub Pages or any static hosting
5. Share with others!

## License

Free to use, modify, and distribute. No attribution required.

## Support

This is a self-contained HTML file with no dependencies (except Google Fonts). If you encounter issues:

1. Check browser console for errors
2. Try clearing localStorage if data seems corrupted
3. Export your data before troubleshooting
4. Use a modern browser for best experience

---

**Happy Bookmarking! 📚✨**
