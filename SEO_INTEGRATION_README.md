# SEO Configuration with Next.js Metadata API

This project integrates the SEO configuration from `seo.config.js` with Next.js Metadata API for automatic generation of meta tags, Open Graph tags, and Twitter Card tags.

## Files Created

### 1. `src/lib/metadata.js`

A utility function that generates metadata based on route parameters.

### 2. `src/lib/seo-helpers.js`

Enhanced utilities with pre-defined metadata generators for all routes.

### 3. `src/config/seo.config.js`

Centralized SEO configuration with metadata for all pages.

## Current App Structure

The app has been simplified with:

- **Root layout only** - No nested layouts (removed for simplicity)
- **Page-level SEO** - Each page handles its own metadata
- **Simple navigation** - Clean links without complex middleware
- **No middleware system** - Removed for simplicity

## Usage Examples

### Method 1: Using Pre-defined Metadata Generators (Recommended)

```javascript
import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.careers()
```

### Method 2: Using Dynamic Metadata Function

```javascript
import { generateMetadata } from '@/lib/metadata'

export function generateMetadata({ params }) {
  const slug = '/' + (params?.slug?.join('/') || '')
  return generateMetadata({ params: { slug: slug.replace(/^\//, '').split('/') } })
}
```

### Method 3: Creating Custom Metadata Generators

```javascript
import { createMetadataGenerator } from '@/lib/seo-helpers'

export const metadata = createMetadataGenerator('/your-custom-route')()
```

## Available Pre-defined Generators

### Core Pages

- `metadataGenerators.home` - for `/`
- `metadataGenerators.about` - for `/about`
- `metadataGenerators.careers` - for `/careers`
- `metadataGenerators.contactUs` - for `/contact-us`

### Project Pages

- `metadataGenerators.latestLaunches` - for `/projects/latest-launches`
- `metadataGenerators.storyBrandedResidences` - for `/projects/story-branded-residences`
- `metadataGenerators.noi` - for `/projects/noi`
- `metadataGenerators.midlane` - for `/projects/midlane`
- `metadataGenerators.yellowLane` - for `/projects/yellow-lane`
- `metadataGenerators.yellowResidence` - for `/projects/yellow-residence`
- `metadataGenerators.eastlane` - for `/projects/eastlane`
- `metadataGenerators.levelsBusinessTower` - for `/projects/levels-business-tower`
- `metadataGenerators.ourProjects` - for `/projects/our-projects`

### Additional Pages

- `metadataGenerators.mediaCenterNews` - for `/media-center-news`
- `metadataGenerators.partnersAssociates` - for `/partners-associates`
- `metadataGenerators.constructionUpdates` - for `/construction-updates`
- `metadataGenerators.cookiePolicy` - for `/cookie-policy`
- `metadataGenerators.privacyPolicy` - for `/privacy-policy`
- `metadataGenerators.termsOfUse` - for `/terms-of-use`

## Implementation in Pages

### Static Pages (Current Approach)

```javascript
// src/app/careers/page.js
import { metadataGenerators } from '@/lib/seo-helpers'

export const metadata = metadataGenerators.careers()

export default function Careers() {
  return <div>Careers page content</div>
}
```

### Dynamic Routes

```javascript
// src/app/[...slug]/page.js
import { generateMetadata } from '@/lib/metadata'

export { generateMetadata }

export default function DynamicPage({ params }) {
  return <div>Dynamic page content</div>
}
```

## Features

- Automatic generation of title, description, and keywords
- Open Graph tags for social media sharing
- Twitter Card tags
- Robots meta tags for SEO
- Fallback to default values if route not found in SEO config
- Consistent URL generation for social media tags

## Benefits

1. **Centralized SEO Management**: All SEO data is managed in `seo.config.js`
2. **Automatic Meta Tag Generation**: No need to manually write meta tags for each page
3. **Social Media Optimization**: Automatic Open Graph and Twitter Card generation
4. **SEO Best Practices**: Includes robots meta tags and proper structure
5. **Performance**: Server-side generation for optimal SEO
6. **Simplified Architecture**: Clean page-level implementation without complex middleware

## Current Navigation Structure

The app uses simple navigation links in `src/components/nav-components/NavLinks.jsx`:

- Home, About, Projects, Careers, Contact
- No middleware or complex routing system
- Direct Next.js routing with SEO metadata

## Next Steps

To add new pages:

1. Create page file in `src/app/your-route/page.js`
2. Add SEO configuration to `seo.config.js`
3. Add metadata generator to `seo-helpers.js`
4. Add navigation link to `NavLinks.jsx` if needed
