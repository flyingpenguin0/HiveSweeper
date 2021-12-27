import styled, { css, DefaultTheme } from 'styled-components';


export const theme_dark : DefaultTheme = {
    mainBackground: `#333`,
    title: `rgba(255,255,255,0.85)`,
    primaryText: `rgba(255,255,255,0.65)`,
    secondaryText: `rgba(255,255,255,0.45)`,
    disable: `rgba(255,255,255,0.25)`,
    border: `rgba(255,255,255,0.15)`,
    divider: `rgba(255,255,255,0.06)`,
    background: `rgba(255,255,255,0.04)`,
};

export const theme_light : DefaultTheme = {
    mainBackground: `#fff`,
    title: `rgba(0, 0, 0, 0.85)`,
    primaryText: `rgba(0, 0, 0, 0.75)`,
    secondaryText: `rgba(0, 0, 0, 0.45)`,
    disable: `rgba(0, 0, 0, 0.25)`,
    border: `rgba(0, 0, 0, 0.15)`,
    divider: `rgba(0, 0, 0, 0.06)`,
    background: `rgba(0, 0, 0, 0.04)`,
}