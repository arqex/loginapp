SVG icons ready to use! Hover the examples to see their codes.

Icons default to the 'auto' size, which is based on the font-size of the text when they are placed inline. You can also set the size.

```jsx
import Home from './svg/Home';
import {Edit} from "@mui/icons-material";

<div >
	<p>Here is some text with an icon <Icon ><Home /></Icon></p>
	<p style={{fontSize: 24}}>Here is some text with an icon <Icon ><Home /></Icon></p>
	<p style={{fontSize: 40}}>Here is some text with an icon <Icon ><Home size="inherit" /></Icon></p>
</div>
```

Components like `ItemIcon` and `WidgetIcon` will set the sizes for you.

Use `size` attribute to change the icon size.

```jsx
import Home from './svg/Home';

<div style={{display: 'flex', flexWrap: 'wrap', gap: 24, alignContent: 'bottom'}}>
	<Icon size="xxs"><Home /></Icon>
	<Icon size="xs"><Home /></Icon>
	<Icon size="sm"><Home /></Icon>
	<Icon size="md"><Home /></Icon>
	<Icon size="lg"><Home /></Icon>
	<Icon size="xl"><Home /></Icon>
	<Icon size="xxl"><Home /></Icon>
</div>
```

Set `width` and `height` attribute for custom sizes

```jsx
import Home from './svg/Home';

<div style={{display: 'flex', flexWrap: 'wrap', gap: 24, alignContent: 'bottom'}}>
	<Icon width={100} height={20}><Home /></Icon>
	<Icon width={20} height={100}><Home /></Icon>
	<Icon width={100} height={100}><Home /></Icon>
	<Icon width={60} height={48}><Home /></Icon>
</div>
```

Use `color` attribute to change the color:

```jsx
import Home from './svg/Home';

<div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
	<Icon size="md" title="Home"><Home /></Icon>
	<Icon size="md" title="Home" color="red"><Home /></Icon>
	<Icon size="md" title="Home" color="blue"><Home /></Icon>
	<Icon size="md" title="Home" color="grey"><Home /></Icon>
	<Icon size="md" title="Home" color="fuchsia"><Home /></Icon>
	<Icon size="md" title="Home" color="yellow"><Home /></Icon>
	<Icon size="md" title="Home" color="orange"><Home /></Icon>
	<Icon size="md" title="Home" color="green"><Home /></Icon>
</div>
```

Use the `direction` prop for arrow icons

```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Arrow from './svg/Arrow';
import Chevron from './svg/Chevron';

<VStack>
	<HStack>
		<Icon direction="forward" size="xl" title="Direction forward"><Arrow /></Icon>
		<Icon direction="down" size="xl" title="Direction down"><Arrow /></Icon>
		<Icon direction="back" size="xl" title="Direction back"><Arrow /></Icon>
		<Icon direction="up" size="xl" title="Direction up"><Arrow /></Icon>
	</HStack>
	<HStack>
		<Icon direction="forward" size="xl" title="Direction forward"><Chevron /></Icon>
		<Icon direction="down" size="xl" title="Direction down"><Chevron /></Icon>
		<Icon direction="back" size="xl" title="Direction back"><Chevron /></Icon>
		<Icon direction="up" size="xl" title="Direction up"><Chevron /></Icon>
	</HStack>
</VStack>
```


Use the `icon` attribute to select the icon. A `title` is also recommended.

<br />



<strong>Simple Icons (20px - `md`)</strong>

```jsx
import * as icons from './svg';

<>
<style>{`.icon { padding: 4px; } .icon:hover { transform: scale(1.2); }`}</style>

<div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
	{ Object.keys(icons).map( (key) => {
		const Ico = icons[key];
		return (
			<div className="icon">
				<Icon size="md" title={key}><Ico /></Icon>
			</div>
		)
	}) }
</div>
</>

```

<strong>Emojis</strong>

Emojis are now part of the Icons system.

```jsx
import * as icons from './emoji';

<>
<style>{`.icon { padding: 4px; } .icon:hover { transform: scale(1.2); }`}</style>

<div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
	{ Object.keys(icons).map( (key) => {
		const Ico = icons[key];
		return (
			<div className="icon">
				<Icon size="xl" title={key}><Ico /></Icon>
			</div>
		)
	}) }
</div>
</>

```

<strong>Brands</strong>


```jsx
import * as icons from './brandIcons';

<>
<style>{`.icon { padding: 4px; } .icon:hover { transform: scale(1.2); }`}</style>

<div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
	{ Object.keys(icons).map( (key) => {
		const Ico = icons[key];
		return (
			<div className="icon">
				<Icon size="xl" title={key}><Ico /></Icon>
			</div>
		)
	}) }
</div>
</>

```

<strong>Brands with wide logos</strong>

Some of the text logos are set up so you can adjust the aspect ratio. You set set the `width` and the `height` seperatly (both default to the `size` if you don't specify). The following currently support this.

```jsx
import * as icons from './brandLogos';

<>
<style>{`.icon { padding: 4px; } .icon:hover { transform: scale(1.2); }`}</style>

<div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
	{ Object.keys(icons).map( (key) => {
		const Ico = icons[key];
		return (
			<div className="icon">
				<Icon width={120} height={50} title={key}><Ico /></Icon>
			</div>
		)
	}) }
</div>
</>

```
