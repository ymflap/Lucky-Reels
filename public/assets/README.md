Lucky Reels — Public Assets

1. Purpose

This directory is intended for static assets that need to be served directly by the web application.

Examples may include game artwork, interface illustrations, logos, and other approved visual resources added during development.

This document describes asset-management conventions only. It does not create game artwork or implement any game functionality.

2. Current Status

Assets may be added here when they are needed by the implemented interface.

No additional image or audio files are required merely to keep this directory documented. Do not add placeholder binaries just to populate the folder.

The existence of this directory does not mean that all planned artwork or visual features have been implemented.

3. Recommended Organization

When the project requires additional assets, use clear and consistent filenames. Suitable categories may include:

- "images/" — approved raster images and illustrations.
- "icons/" — interface icons.
- "audio/" — sound effects and music, if required.
- "branding/" — approved project branding.

Create subdirectories only when actual assets justify them. Keep the structure simple and avoid adding unused directories.

4. File Formats and Optimization

Choose formats according to the asset's purpose:

- SVG: suitable for simple vector graphics and icons when supported by the application's security and rendering requirements.
- WebP: suitable for optimized raster artwork and illustrations.
- PNG: suitable when lossless quality or transparency is required.
- JPEG: suitable for photographic images that do not require transparency.
- Audio formats: choose an appropriate browser-supported format only when audio is implemented.

Optimize file sizes before committing assets. Avoid unnecessarily large images, duplicate files, and unused resources.

5. Licensing and Ownership

Only add assets that are original, properly licensed, or otherwise authorized for use in this project.

Record relevant license and attribution information when required. Do not copy artwork, logos, music, or other copyrighted material from third parties without permission.

Do not describe third-party assets as original project artwork.

6. Accessibility and Display

When an image conveys information, provide meaningful alternative text in the interface that uses it.

Decorative images should not create unnecessary screen-reader output. Ensure important visual content remains legible on narrow mobile screens and in the application's supported display modes.

Asset filenames should describe their content or purpose without relying on temporary names such as "image-final-new-2".

7. Integration Requirements

Adding a file to this directory does not automatically integrate it into the application.

Any new asset must be referenced by the relevant application code and tested in the resulting build. Verify its path, loading behavior, dimensions, and performance on supported screen sizes.

Do not claim that a feature, animation, sound effect, or visual design is implemented solely because an associated asset exists.

8. Maintenance

Before committing new assets:

1. Confirm that the asset is needed.
2. Verify its source and usage rights.
3. Optimize its dimensions and file size.
4. Use a descriptive filename.
5. Update application references where necessary.
6. Run the relevant tests and production build.
7. Remove assets that are no longer referenced.

Keep this directory limited to approved resources required by the project.
