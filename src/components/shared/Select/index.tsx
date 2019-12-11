import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Modal,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, { useCallback, useState } from 'react';
import styled, { DefaultTheme, css } from 'styled-components/native';

import { FlattenSimpleInterpolation } from 'styled-components';

export enum ThemeEnum {
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

interface BorderStyle extends ViewStyle {
  borderColor?: string;
  borderWidth?: number;
  borderBottomColor?: string;
  borderBottomWidth?: number;
  borderLeftColor?: string;
  borderLeftWidth?: number;
  borderRightColor?: string;
  borderRightWidth?: number;
  borderTopColor?: string;
  borderTopWidth?: number;
}

interface RootBoxTheme extends DefaultTheme {
  rootbox: {
    backgroundColor: string;
    boxShadow?: FlattenSimpleInterpolation;
    border?: BorderStyle;
  };
}

interface TextTheme extends DefaultTheme {
  text: {
    fontColor: string;
  };
}

interface ThemeStyle<T> extends DefaultTheme {
  blank: T;
  none: T;
  box: T;
  underbar: T;
}

interface ThemeType {
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

const bsCss = css`
  elevation: 1;
  shadow-color: ${COLOR.DODGERBLUE};
  shadow-offset: {
    width: 3;
    height: 3;
  }
  shadow-opacity: 0.5;
  shadow-radius: 5;
`;

export const themeStylePropCollection: ThemeStyle<RootBoxTheme | TextTheme> = {
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
      boxShadow: bsCss,
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  box: {
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
  underbar: {
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
};

interface ThemePropParams {
  theme: ThemeEnum;
  comp: CompEnum;
  prop: StylePropEnum;
}

const getThemeProp = ({ theme, comp, prop }: ThemePropParams): string => {
  return themeStylePropCollection[theme][comp][prop];
};

const SelectContainer = styled.View`
  z-index: 1;
`;
const Text = styled.Text<ThemeType>`
  font-size: 14px;
  color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.text,
      prop: StylePropEnum.fc,
    })};
`;

const RootSelect = styled.View<ThemeType>`
  background-color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bc,
    })};
  ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bs,
    })}
  ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.border,
    })}
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
  shadow-offset: {
    width: 0;
    height: 5;
  }
  shadow-opacity: 0.2;
`;

interface Item {
  value: string;
  text: string;
}

const SelectList = styled(FlatList as new () => FlatList<Item>)`
  background-color: ${COLOR.WHITE};
  padding-top: 8px;
`;

const RootCloseView = styled.TouchableOpacity`
  width: 100%;
`;

const ItemView = styled.TouchableOpacity<Selected>`
  background-color: ${({ selected }: { selected: boolean }): string =>
    selected ? COLOR.LIGHTBLUE : COLOR.WHITE};
  height: 32px;
  padding: 6px;
  justify-content: center;
`;

const ItemText = styled.Text<Selected>`
  font-size: 14px;
  color: ${COLOR.BLACK};
`;

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
  onSelect: (Item) => void;
  selectedItem: Item;
}

function Select(props: Props): React.ReactElement {
  const selectRef = React.createRef();
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
  const [layout, setLayout] = useState<object>({});
  const toggleList = useCallback(() => {
    setListOpen(!listOpen);
  }, [listOpen]);

  const handleSelect = (item: Item): void => {
    onSelect(item);
    setListOpen(false);
  };

  const defaultTheme = !theme ? 'none' : theme;
  const rootViewTheme =
    rootViewStyle && Object.keys(rootViewStyle).length > 0
      ? 'blank'
      : defaultTheme;
  const rootTextTheme =
    rootTextStyle && Object.keys(rootTextStyle).length > 0
      ? 'blank'
      : defaultTheme;

  const renderItem = ({
    item,
  }: ListRenderItemInfo<Item>): React.ReactElement => {
    const style = itemStyle
      ? selectedItem && selectedItem.value === item.value
        ? itemStyle.selectedItem
        : itemStyle.defaultItem
      : {};
    return (
      <ItemView
        style={style}
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
              ? itemStyle && itemStyle.selectedItem
              : itemStyle && itemStyle.defaultItem
          }
        >
          {item.text}
        </ItemText>
      </ItemView>
    );
  };
  return (
    <SelectContainer
      ref={selectRef}
      onLayout={(): void => {
        selectRef.current.measure((ox, oy, width, height, px, py) => {
          setLayout({ ox, oy, px, py, width, height });
        });
      }}
    >
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
      <Modal
        visible={listOpen}
        onRequestClose={(): void => {
          setListOpen(false);
        }}
        transparent={true}
      >
        <SelectListView
          style={[
            itemStyle && itemStyle.list,
            { top: layout.py, left: layout.px, width: layout.width },
          ]}
        >
          <RootCloseView
            onPress={toggleList}
            style={{ height: layout.height }}
          ></RootCloseView>
          <SelectList
            style={itemStyle && itemStyle.defaultItem}
            testID={`${testID}-${TESTID.SELECTLIST}`}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item: Item, index: number): string => item.value}
          />
        </SelectListView>
      </Modal>
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
