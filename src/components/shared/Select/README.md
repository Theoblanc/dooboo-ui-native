# Select

- [![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)
- [![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)

![Select Component themes](https://user-images.githubusercontent.com/33364619/70374774-fd328c00-1939-11ea-9af4-776c6885bd41.png)

## Props

### Table of `Props`

|                       | necessary | types                                                          | default |
| --------------------- | --------- | -------------------------------------------------------------- | ------- |
| testID                |           | string                                                         |         |
| label                 |           | string                                                         |         |
| items                 | ✓         | array                                                          |         |
| placeholder           |           | string                                                         |         |
| [theme](#theme)       |           | 'none', 'underbar', 'box'                                      | 'none'  |
| rootViewStyle         |           | ViewStyle                                                      |         |
| rootTextStyle         |           | TextStyle                                                      |         |
| itemStyle             |           | {list:ViewStyle, defaultItem:ViewStyle, selectedItem:ViewStyle |         |
| disabled              |           | boolean                                                        | `false` |
| [onFocus](#onFocus)   |           | func                                                           |         |
| [onBlur](#onBlur)     |           | func                                                           |         |
| [onSelect](#onSelect) |           | func                                                           |         |

### Description of `Props`

#### theme

- injecting some value to prop `theme`, the other prop `rootViewStyle` doesn't work.
  - `theme` & `rootTextStyle` props work
- if you want to `rootViewStyle` work, make `theme` prop empty

#### onFocus

...onFocus

#### onBlur

...onFocus

#### onSelect

...onFocus

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-select
```

## Getting started

- Import

  ```javascript
  import { Select } from '@dooboo-ui/native';
  ```

- Usage
  ```jsx
  <Container>
    <Select
      theme={'underbar'}
      rootViewStyle={{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
      }}
      rootTextStyle={{
        color: 'orange',
      }}
      itemStyle={{
        list: {},
        defaultItem: {
          color: 'grey',
        },
        selectedItem: {
          color: 'black',
        },
      }}
      placeholder={'select'}
      onClick={action('Clicked')}
      items={ITEMS}
    />
  </Container>
  ```
