import {
  FlatList,
  Image,
  ShadowStyleIOS,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, { useCallback, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components/native';

enum ThemeEnum {
  blank = 'blank',
  none = 'none',
  box = 'box',
  underbar = 'underbar',
}
enum CompEnum {
  rootbox = 'rootbox',
  text = 'text',
  item = 'item',
}
enum StylePropEnum {
  bc = 'backgroundColor',
  fc = 'fontColor',
  bs = 'boxShadow',
  border = 'border',
}

interface BoxShadowType extends ShadowStyleIOS {
  elevation: number;
  // shadowOffset: { width: number; height: number };
  // shadowColor: string;
  // shadowOpacity: number;
  // shadowRadius: number;
}
interface BorderStyle extends ViewStyle {
  borderBottomColor?: string;
  borderBottomEndRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomStartRadius?: number;
  borderBottomWidth?: number;
  borderColor?: string;
  borderEndColor?: string;
  borderLeftColor?: string;
  borderLeftWidth?: number;
  borderRadius?: number;
  borderRightColor?: string;
  borderRightWidth?: number;
  borderStartColor?: string;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderTopColor?: string;
  borderTopEndRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderTopStartRadius?: number;
  borderTopWidth?: number;
  borderWidth?: number;
}

interface RootBoxThemeType extends DefaultTheme {
  rootbox: {
    backgroundColor: string;
    boxShadow?: BoxShadowType;
    border?: BorderStyle;
  };
}
interface TextThemeType extends DefaultTheme {
  text: {
    fontColor: string;
  };
}
interface ListItemThemeType extends DefaultTheme {
  listItem: {
    backgroundColor: string;
    boxShadow?: BoxShadowType;
    border?: BorderStyle;
    fontColor: string;
  };
}
// interface CompStyleType {
//   rootbox: RootBoxThemeType;
//   text: TextThemeType;
// }
interface ThemeType<T> extends DefaultTheme {
  blank: T;
  none: T;
  box: T;
  underbar: T;
}
// interface ViewType extends ThemeType<RootBoxThemeType> {
//   theme: ThemeType<RootBoxThemeType>;
// }
// interface TextType extends ThemeType<TextThemeType> {
//   theme: ThemeType<TextThemeType>;
// }
interface ViewType {
  theme: ThemeEnum;
}
interface TextType {
  theme: ThemeEnum;
}
interface Selected {
  selected: boolean;
}

export const TESTID = {
  ROOTSELECT: 'root-select',
  ROOTTEXT: 'root-text',
  ROOTARROW: 'root-arrow',
  SELECTLIST: 'list',
};

const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  DODGERBLUE: '#5364ff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
  DARK: '#09071d',
  LIGHTBLUE: '#bcdbfb',
  BLACK: '#000000',
};

export const themeStylePropCollection: ThemeType<
  RootBoxThemeType | TextThemeType
> = {
  blank: {
    rootbox: {
      backgroundColor: 'transparent',
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  none: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      boxShadow: {
        elevation: 1,
        shadowColor: COLOR.DODGERBLUE,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  box: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      border: {
        borderBottomColor: COLOR.GRAY59,
        borderBottomWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  underbar: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      border: {
        borderColor: COLOR.GRAY59,
        borderWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
};

type ThemeProp = string | BoxShadowType | BorderStyle;

const getThemeProp = ({
  theme,
  comp,
  prop,
}: {
  theme: ThemeEnum;
  // theme: any;
  comp: CompEnum;
  prop: StylePropEnum;
}): ThemeProp => {
  return themeStylePropCollection[theme][comp][prop];
};

const SelectContainer = styled.View``;
const Text = styled.Text<TextType>`
  font-size: 14px;
  color: ${({ theme }: { theme: ThemeEnum }): ThemeProp =>
    getThemeProp({
      theme: theme,
      comp: CompEnum.text,
      prop: StylePropEnum.fc,
    })};
`;

const RootSelect = styled.View<ViewType>`
  background-color: ${({ theme }: { theme: ThemeEnum }): ThemeProp =>
    getThemeProp({
      theme: theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bc,
    })};
  ${({ theme }: { theme: ThemeEnum }): ThemeProp =>
    getThemeProp({
      theme: theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bs,
    })};
  ${({ theme }: { theme: ThemeEnum }): ThemeProp =>
    getThemeProp({
      theme: theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.border,
    })};
  width: 128px;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6px;
`;
const SelectListView = styled.View`
  elevation: 8;
  shadow-color: ${COLOR.DODGERBLUE};
  shadow-offset: { width: 0, height: 5 };
  shadow-opacity: 0.2;
`;
const SelectList = styled(FlatList)`
  background-color: ${COLOR.WHITE};
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 8px;
`;
const ItemView = styled.TouchableOpacity<Selected>`
  background-color: ${({ selected }: { selected: boolean }): string =>
    selected ? COLOR.LIGHTBLUE : COLOR.WHITE};
  width: 128px;
  height: 32px;
  padding: 6px;
  justify-content: center;
`;
const ItemText = styled.Text<Selected>`
  font-size: 14px;
  color: ${COLOR.BLACK};
`;

interface Item {
  value: string;
  text: string;
}

interface ItemStyle {
  list?: StyleProp<DefaultTheme>;
  defaultItem?: StyleProp<DefaultTheme>;
  selectedItem?: StyleProp<DefaultTheme>;
}

interface Props {
  testID?: string;
  theme?: ThemeEnum;
  rootViewStyle?: StyleProp<ViewStyle>;
  rootTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  activeOpacity: number;
  disabled?: boolean;
  items: Item[];
  itemStyle?: ItemStyle;
  onSelect: (Item) => {};
  selectedItem: Item;
}

function Select(props: Props): React.ReactElement {
  const {
    testID,
    theme,
    rootViewStyle,
    rootTextStyle,
    placeholder,
    activeOpacity,
    disabled,
    items,
    itemStyle,
    onSelect,
    selectedItem,
  } = props;

  const [listOpen, setListOpen] = useState<boolean>(false);
  const toggleList = useCallback(
    (e) => {
      setListOpen(!listOpen);
    },
    [listOpen],
  );

  const handleSelect = (item: Item): void => {
    onSelect(item);
    setListOpen(false);
  };

  // const isThemeEmpty = theme === null || theme === undefined || theme === '';
  const defaultTheme = !theme ? 'none' : theme;
  const rootViewTheme =
    !rootViewStyle || Object.keys(rootViewStyle).length > 0
      ? 'blank'
      : defaultTheme;
  const rootTextTheme =
    !rootTextStyle || Object.keys(rootTextStyle).length > 0
      ? 'blank'
      : defaultTheme;

  const renderItem = ({ item }: { item: Item }): React.ReactElement => {
    return (
      <ItemView
        style={
          selectedItem && selectedItem.value === item.value
            ? itemStyle.selectedItem
            : itemStyle.defaultItem
        }
        selected={selectedItem && selectedItem.value === item.value}
        activeOpacity={1}
        onPress={(): void => {
          handleSelect(item);
        }}
      >
        <ItemText
          selected={selectedItem && selectedItem.value === item.value}
          style={
            selectedItem && selectedItem.value === item.value
              ? itemStyle.selectedItem
              : itemStyle.defaultItem
          }
        >
          {item.text}
        </ItemText>
      </ItemView>
    );
  };
  return (
    <SelectContainer>
      <TouchableOpacity
        testID={testID}
        activeOpacity={activeOpacity}
        onPress={toggleList}
        disabled={disabled}
      >
        <RootSelect
          theme={rootViewTheme}
          style={rootViewStyle}
          testID={`${testID}-${TESTID.ROOTSELECT}`}
        >
          <Text
            theme={rootTextTheme}
            style={rootTextStyle}
            testID={`${testID}-${TESTID.ROOTTEXT}`}
          >
            {selectedItem ? selectedItem.text : placeholder}
          </Text>
          <Image
            source={!listOpen ? IC_ARR_DOWN : IC_ARR_UP}
            testID={`${testID}-${TESTID.ROOTARROW}`}
          />
        </RootSelect>
      </TouchableOpacity>
      {listOpen && (
        <SelectListView style={itemStyle.list}>
          <SelectList
            style={itemStyle.defaultItem}
            testID={`${testID}-${TESTID.SELECTLIST}`}
            data={items}
            renderItem={renderItem}
            keyExtractor={({ value }: { value: string }): string => value}
          />
        </SelectListView>
      )}
    </SelectContainer>
  );
}

Select.defaultProps = {
  theme: 'none',
  placeholder: '',
  activeOpacity: 0.5,
  rootViewStyle: null,
  rootTextStyle: null,
};

export default Select;
