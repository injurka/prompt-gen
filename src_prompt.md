== Project Prompt ==
Generated: 2025-04-08T14:57:27.256Z
Source Directory: /home/evai/work/PACKAGES/ui-kit-cms/source/stories/multipage-editor/components/ui/field-renderer/shemas
Included Files: 17
Total Size: 11.79 KB
Format: flat
====================

=== Project File Structure ===
├── answers.ts
├── badges.ts
├── body.ts
├── button.ts
├── callback-link.ts
├── content-link-button.ts
├── header-picture.ts
├── header.ts
├── html-text.ts
├── index.ts
├── list.ts
├── picture.ts
├── play-button.ts
├── rating.ts
├── shared.ts
├── title.ts
└── video.ts
============================

--- File: answers.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const answers: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'array',
items: {
number: {
typeControl: 'number',
},
value: {
typeControl: 'text',
},
isCorrectAnswer: {
typeControl: 'boolean',
},
},
},
nextPage: {
typeControl: 'number',
},
}

export { answers }

--- File: badges.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const badges: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
// Заполняем на стороне клиента
// value: {
// typeControl: 'array',
// items: {
// number: {
// typeControl: 'number',
// },
// value: {
// typeControl: 'text',
// },
// prepandIcon: {
// typeControl: 'text',
// },
// },
// },
}

export { badges }

--- File: body.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const body: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
}

export { body }

--- File: button.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const button: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
modeRelatedValues: {
properties: {
key: {
typeControl: 'text',
},
value: {
typeControl: 'text',
},
},
},
buttonType: {
typeControl: 'select',
variants: ['Primary', 'Secondary'],
},
position: {
typeControl: 'select',
variants: ['Auto', 'Bottom'],
},
nextPage: {
typeControl: 'number',
},
}

export { button }

--- File: callback-link.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const callbackLink: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
modeRelatedValues: {
properties: {
key: {
typeControl: 'text',
},
value: {
typeControl: 'text',
},
},
},
buttonType: {
typeControl: 'select',
variants: ['Primary', 'Secondary'],
},
position: {
typeControl: 'select',
variants: ['Auto', 'Bottom'],
},
callbackLink: {
typeControl: 'text',
},
}

export { callbackLink }

--- File: content-link-button.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const contentLinkButton: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
modeRelatedValues: {
properties: {
key: {
typeControl: 'text',
},
value: {
typeControl: 'text',
},
},
},
buttonType: {
typeControl: 'select',
variants: ['Primary', 'Secondary'],
},
position: {
typeControl: 'select',
variants: ['Auto', 'Bottom'],
},
contentLink: {
sysname: {
typeControl: 'text',
},
type: {
typeControl: 'text',
},
},
}

export { contentLinkButton }

--- File: header-picture.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const headerPicture: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
pictureType: {
typeControl: 'select',
variants: [
'Primary',
'Borderless',
'ShadowBorder',
],
},
text: {
typeControl: 'textarea',
},
textProps: {
textAlign: {
typeControl: 'select',
variants: [
'center',
'left',
'right',
],
},
},
backgroundProps: {
backgroundImg: {
typeControl: 'text',
},
backgroundColor: {
typeControl: 'text',
},
backgroundImgPosition: {
typeControl: 'number',
},
},
value: {
typeControl: 'text',
},

}

export { headerPicture }

--- File: header.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const header: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
headerType: {
typeControl: 'select',
variants: [
'TitleXLDecorative',
'TitleXL',
'TitleLDecorative',
'TitleL',
'TitleMDecorative',
'TitleM',
'TitleSDecorative',
'TitleS',
'BodyXLMedium',
'BodyXLRegular',
'BodyLMedium',
'BodyLRegular',
'BodyMMedium',
'BodyMRegular',
'BodySMedium',
'BodySRegular',
'ContentBodyLRegular',
'ContentBodyLItalic',
'ContentBodyLUnderline',
'ContentBodyLRegularItalicUnderline',
'ContentBodyLBold',
'ContentBodyLBoldItalic',
'ContentBodyLBoldUnderline',
'ContentBodyLBoldItalicUnderline',
'LabelL',
'LabelM',
'LabelS',
'NumbersLRegular',
'NumbersSRegular',
'CaptionS',
'LargeTitle',
'Title1',
'Title2',
'Title3',
'Headline',
'Body',
'BodyBold',
'BodyS',
'BodySBold',
'Callout',
'CalloutBold',
'Subheadline',
'SubheadlineBold',
'Footnote',
'Caption1',
'Caption1Bold',
'Caption2',
'Caption2Bold',
],
},
}

export { header }

--- File: html-text.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const htmlText: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
}

export { htmlText }

--- File: index.ts ---

import type { SchemaField, SchemaFieldSection } from './shared'

import { EMultipageContentObjectType } from '@mentalhealth/api/cms'
import { answers } from './answers'
import { badges } from './badges'
import { body } from './body'
import { button } from './button'
import { callbackLink } from './callback-link'
import { contentLinkButton } from './content-link-button'
import { header } from './header'
import { headerPicture } from './header-picture'
import { htmlText } from './html-text'
import { list } from './list'
import { picture } from './picture'
import { playButton } from './play-button'
import { rating } from './rating'
import { title } from './title'
import { video } from './video'

const schemas = {
[EMultipageContentObjectType.Body]: body,
[EMultipageContentObjectType.Header]: header,
[EMultipageContentObjectType.HeaderPicture]: headerPicture,
[EMultipageContentObjectType.HtmlText]: htmlText,
[EMultipageContentObjectType.Button]: button,
[EMultipageContentObjectType.CallbackLinkButton]: callbackLink,
[EMultipageContentObjectType.ContentLinkButton]: contentLinkButton,
[EMultipageContentObjectType.List]: list,
[EMultipageContentObjectType.Picture]: picture,
[EMultipageContentObjectType.PlayButton]: playButton,
[EMultipageContentObjectType.Rating]: rating,
[EMultipageContentObjectType.Video]: video,
[EMultipageContentObjectType.Title]: title,
[EMultipageContentObjectType.Answers]: answers,
[EMultipageContentObjectType.Badges]: badges,
}

export { schemas }
export type { SchemaField, SchemaFieldSection }

--- File: list.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const list: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'array',
items: {
typeControl: 'text',
},
},
startIndex: {
typeControl: 'number',
},
listType: {
typeControl: 'select',
variants: ['Number', 'Dot'],
},
}

export { list }

--- File: picture.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const picture: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
pictureType: {
typeControl: 'select',
variants: [
'Primary',
'Borderless',
'ShadowBorder',
],
},
text: {
typeControl: 'textarea',
},
value: {
typeControl: 'text',
},
backgroundProps: {
backgroundImg: {
typeControl: 'text',
},
backgroundColor: {
typeControl: 'text',
},
backgroundImgPosition: {
typeControl: 'number',
},
},
}

export { picture }

--- File: play-button.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const playButton: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
modeRelatedValues: {
properties: {
key: {
typeControl: 'text',
},
value: {
typeControl: 'text',
},
},
},
buttonType: {
typeControl: 'select',
variants: ['Primary', 'Secondary'],
},
position: {
typeControl: 'select',
variants: ['Auto', 'Bottom'],
},
videoType: {
typeControl: 'select',
variants: ['Shorts', 'Video'],
},
contentLink: {
typeControl: 'text',
},
}

export { playButton }

--- File: rating.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const rating: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
}

export { rating }

--- File: shared.ts ---

interface SchemaField {
typeControl?: 'select' | 'text' | 'textarea' | 'number' | 'array' | 'boolean'
variants?: string[]
disabled?: boolean
items?: SchemaField
[key: string]: any
}

type SchemaFieldSection = Record<string, SchemaField>

const contenTypeVariants = [
'Title',
'Answers',
'Header',
'Body',
'Picture',
'HeaderPicture',
'Video',
'Audio',
'Button',
'PlayButton',
'CallbackLink',
'ContentLinkButton',
'HtmlText',
'List',
'Badges',
'Rating',
]

export { contenTypeVariants }
export type { SchemaField, SchemaFieldSection }

--- File: title.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const title: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
}

export { title }

--- File: video.ts ---

import type { SchemaFieldSection } from './shared'
import { contenTypeVariants } from './shared'

const video: SchemaFieldSection = {
type: {
typeControl: 'select',
variants: contenTypeVariants,
disabled: true,
},
number: {
typeControl: 'number',
disabled: true,
},
value: {
typeControl: 'text',
},
options: {
isVertical: {
typeControl: 'boolean',
},
isAutoFullScreen: {
typeControl: 'boolean',
},
},
}

export { video }
