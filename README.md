"build:styles": "tailwindcss -i ./src/styles/globals.css -o ./dist/index.css",
    "build:components": "tsc",
    "check-types": "tsc --noEmit",
    "dev:styles": "tailwindcss -i ./src/styles/globals.css -o ./dist/index.css --watch",
    "dev:components": "tsc --watch"

    {
  "extends": ["//"],
  "tasks": {
    "build": {
      "dependsOn": ["build:styles", "build:components"]
    },
    "build:styles": {
      "outputs": ["dist/**"]
    },
    "build:components": {
      "outputs": ["dist/**"]
    },
    "dev": {
      "with": ["dev:styles", "dev:components"]
    },
    "dev:styles": {
      "cache": false,
      "persistent": true
    },
    "dev:components": {
      "cache": false,
      "persistent": true
    }
  }
}