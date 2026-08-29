# 🎂 Happy Birthday Mayabee Website

A sophisticated, interactive birthday website with magical animations, countdown, games, and heartfelt messages.

## 📁 File Structure

```
birthday/
├── birthday.html           # Main HTML structure
├── birthday-styles.css     # All styling and animations
├── birthday-script.js      # Interactive logic and animations
├── birthday-song.mp3       # [OPTIONAL] Background music file
└── photos/                 # [OPTIONAL] Your photo directory
    ├── photo1.jpg
    ├── photo2.jpg
    └── ...
```

## 🎨 Features

✨ **Countdown Timer** - Uses Bangladesh Standard Time (UTC+6) until August 31, 00:00
✨ **Magical Midnight Transition** - Cinematic reveal when birthday arrives
✨ **Interactive Birthday Card** - Beautiful glassmorphism design
✨ **Heartfelt Letter Section** - Personal emotional messages
✨ **Attribute Cards** - "You Are..." interactive cards
✨ **Roast Section** - Sibling humor with inside jokes
✨ **Photo Gallery** - Beautiful placeholder photos ready for your images
✨ **Timeline** - "The Lore" section with chapter-based memories
✨ **Pop Game** - Interactive balloon/star popping challenge
✨ **Mystery Gifts** - 4 interactive gift boxes with surprises
✨ **Easter Eggs** - Hidden interactions throughout
✨ **Music Player** - Optional background music
✨ **Responsive Design** - Beautiful on desktop, tablet, and mobile

## 🖼️ Adding Photos

### Method 1: Replace Photo Placeholders (Easiest)

1. Create a `photos/` folder in the same directory as the HTML file
2. Add your images: `photo1.jpg`, `photo2.jpg`, etc.
3. Open `birthday.html` and find the photo section
4. Replace the placeholder divs with actual images:

```html
<!-- BEFORE -->
<div class="photo-card">
    <div class="photo-placeholder">YOUR PHOTO HERE</div>
    <p class="photo-caption">Memory 1</p>
</div>

<!-- AFTER -->
<div class="photo-card">
    <img src="photos/photo1.jpg" alt="Memory 1" style="width: 100%; height: 100%; object-fit: cover;">
    <p class="photo-caption">The time we...</p>
</div>
```

### Method 2: Update CSS for Background Images

Edit the `.photo-placeholder` CSS in `birthday-styles.css`:

```css
.photo-placeholder {
    background-image: url('photos/photo1.jpg');
    background-size: cover;
    background-position: center;
    border: none;
    font-size: 0;
}
```

## 🎵 Adding Music

1. Get an MP3 file (any birthday song or personal recording)
2. Name it `birthday-song.mp3`
3. Place it in the same directory as `birthday.html`
4. The music player will automatically find it

**Note:** If the file doesn't exist, the website still works perfectly. The music player just won't have audio.

## 📝 Customizing Messages

### Edit Birthday Card Joke
Find this in `birthday.html`:
```html
<p class="card-joke">If it was, Jeffrey Epstein wouldn't be a criminal lmao.</p>
```

### Edit Heartfelt Letter
Find this in `birthday.html`:
```html
<p class="letter-main-text" id="letterMainText">
    You're the 1st woman I love and my only current emotional dependency.
</p>
```

### Add More "You Are..." Cards
Find the cards section and add:
```html
<div class="attribute-card card-5" data-tooltip="New card">
    <div class="card-inner">
        <p class="card-text">Your custom message here.</p>
    </div>
</div>
```

### Edit Roast Cards
Find the roast section and modify or add cards:
```html
<div class="roast-card">
    <h3 class="roast-label">Your label</h3>
    <p class="roast-answer">Your message here.</p>
</div>
```

### Edit Timeline Chapters
Find "The Lore" section and update:
```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3>Chapter 01 — The Beginning</h3>
        <div class="timeline-image-placeholder">[Add childhood photo]</div>
        <p>Your memory description here.</p>
    </div>
</div>
```

### Edit Gift Messages
In `birthday-script.js`, find this section:
```javascript
const giftMessages = {
    1: "You're stuck with me. Sorry bro. 😂",
    2: "Keep being amazing. That's the real gift.",
    3: "Remember that time we... yeah, good times. 📸",
    4: "No matter how old you get, you're still my annoying older sister. And I love you for it. ❤️"
};
```

### Edit Final Message
Find the final section in `birthday.html` and update:
```html
<p>
    You're annoying. Like, genuinely annoying sometimes. And you're getting old (ew).
</p>
```

## 🎮 Game Customization

Change the target pop count (currently 10):
```javascript
const GAME_TARGET = 10; // Change this number
```

Add more game messages:
```javascript
const gameMessages = [
    "Nice.",
    "Skill issue if you missed that.",
    // Add your messages here
];
```

## 🎁 Easter Eggs Included

1. **Star Secret** - Click particles 3 times
2. **Heart Secret** - Double-click at the top
3. **Konami Code** - Arrow up, up, down, down, left, right, left, right
4. **Name Secret** - Type "MAYABEE"

## 🌍 Timezone Information

The countdown is set to **Bangladesh Standard Time (UTC+6)** and triggers at **August 31, 00:00:00 BST**.

The JavaScript automatically:
- Converts the user's local time to Bangladesh time
- Triggers the magical transition at the exact moment
- Shows the birthday experience if accessed after August 31
- Never returns to countdown state after birthday starts

## 🎨 Color Customization

Edit CSS variables in `birthday-styles.css`:
```css
:root {
    --primary-dark: #0f1629;
    --accent-violet: #6b5b95;
    --accent-gold: #d4af7a;
    --accent-rose: #c9a8d4;
    /* ... more colors ... */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: Full experience, all features active
- **Tablet (768px)**: Optimized layout, smaller fonts
- **Mobile (480px)**: Condensed layout, touch-friendly

## 🚀 Deployment

1. Upload all files to your web server
2. Ensure all files are in the same directory
3. Open `birthday.html` in a browser
4. Share the URL with Mayabee!

**Note:** If hosting online, make sure CORS is configured properly for the music file.

## 💡 Tips & Tricks

- **Memory Placeholder Images** - Change the text "YOUR PHOTO HERE" to any message or description
- **Add Captions** - Edit the `data-caption` attributes on photo cards
- **Custom Emojis** - Replace any emoji throughout with your preferences
- **Animation Speed** - Adjust transition durations in CSS (search for `0.6s`, `1s`, etc.)
- **Particle Effects** - Change particle types in JavaScript (stars, hearts, sparkles, etc.)

## ⚙️ Browser Compatibility

- Chrome/Edge: Full support ✅
- Firefox: Full support ✅
- Safari: Full support ✅
- Mobile browsers: Full support ✅

## 🔧 Troubleshooting

**Music doesn't play:**
- Ensure `birthday-song.mp3` is in the same folder
- Check browser autoplay policies
- The website works fine without music

**Photos not showing:**
- Check file paths are correct
- Ensure images are in the `photos/` folder
- Verify image file names match exactly

**Countdown shows wrong time:**
- Clear browser cache
- Check system timezone settings
- The code always uses Bangladesh time (UTC+6)

## 📧 Final Notes

This website is designed to be personalized and easy to edit. Every section has clear comments indicating where to add content. Feel free to modify colors, animations, messages, and structure to perfectly match Mayabee's personality!

The most important thing: Make it feel genuine, thoughtful, and uniquely yours. 💕

---

**Happy Birthday, Mayabee! ✨**
