# Wallpaper Engine - Wallhaven Extended

**A web application running inside of Wallpaper Engine.**

![screenshot.jpg](screenshot.jpg)

The main goal of this application is to provide you with a new wallpaper every X amount of minutes from [Wallhaven](https://wallhaven.cc/).
This is done by using their public [API](https://wallhaven.cc/help/api) and then picking a random page and wallpaper item from said page.

## Installation

Simply copy this folder to your wallhaven custom projects folder.
An example location on the Steam version of Wallhaven would be:
`C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\projects\myprojects\Wallhaven_Extended_v2`

## Tech stack

[NodeJS v24.11.0](https://nodejs.org/en/download)
[Typescript 5.9.3](https://www.typescriptlang.org/)

This project uses Typescript together with plain ES6 Javascript.
The compiled output is identical to the input, minus the types.

## Preferences

**Wallhaven settings**. These are supported filtering options used with the [Wallhaven API](https://wallhaven.cc/help/api).

- Search
  This includes tags, users etc.

- Sort by
  - None (default)
  - Random
  - Date Added
  - Views
  - Favorites
  - Toplist

  A random page will be picked from this section.

- Sort by age (Only affects "Toplist sorting)
  - None (default)
  - 1 Day
  - 3 Days
  - 1 Week
  - 1 Month
  - 3 Months
  - 6 Months
  - 1 Year

- Max random page number
  A random page number between 1 and this number will always be picked. Adjust this number if you do not get enough results for your query.

- Categories
  - General
  - People
  - Anime
- Purity
  - SFW
  - Sketchy
  - NSFW (Requires API key)

- Wallpaper size
  The minimum dimensions that a wallpaper should have.

- Screen Ratio
  - None
  - All wide
  - 16x9
  - 16x10
  - 21x9
  - 32x9
  - 48x9
  - All portrait
  - 9x16
  - 10x16
  - 9x18
  - 1x1
  - 3x2
  - 4x3

**WPE settings**. These are application settings outside of the Wallhaven filtering options.

- Base font size
  This controls the size of the UI elements like the debug info (current wallpaper page), calendar and clock widgets.
  All elements are based upon this value by using `rem` units.

- Position Bottom
  This controls how far up or down the app items are displayed. Useful when you task bar gets in the way.

- Display debug info
  This displays The API request as well as the current and previous wallpaper page that was chosen.

- Display calendar and time widget

- Date and time format
  - ISO (European)
  - US

- Static wallpaper
  Allows you to select an image on your computer to use instead of a Wallhaven wallpaper.

- Change wallpaper frequency (minutes)
  Your wallpaper will automatically be replaced every X amount of minutes.
  Set to 0 to disable.

- Clicks to change wallpaper
  By default set to 2, which allows you to double click on the desktop to change wallpaper

For further changes, you can edit the CSS variables inside of `styles-custom.css` to change element colors etc.
