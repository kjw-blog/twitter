import { global } from '@/app/globalTheme.css';
import { style } from '@vanilla-extract/css';

export const modalBackground = style({
  width: '100dvw',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: 'rgba(91, 112, 131, 0.4)',
    },
  },
});

export const modal = style({
  backgroundColor: global.background.color,
  position: 'relative',
  width: '100%',
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
  '@media': {
    '(min-width: 687px)': {
      top: '5%',
      minWidth: 600,
      maxWidth: 600,
      height: 550,
      padding: 0,
    },
  },
});

export const modalHeader = style({
  padding: '36px 0 20px',
  fontSize: 31,
  fontWeight: 'bold',
  '@media': {
    '(min-width: 687px)': {
      padding: '36px 80px 20px',
    },
  },
});

export const modalForm = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export const modalBody = style({
  flex: 1,
  '@media': {
    '(min-width: 687px)': {
      padding: '0 80px',
    },
  },
});

export const inputDiv = style({
  display: 'flex',
  flexDirection: 'column',
  height: 56,
  position: 'relative',
  margin: '12px 0',
});

export const inputLabel = style({
  width: '100%',
  display: 'inline-block',
  position: 'absolute',
  top: 0,
  border: '1px solid rgb(207, 217, 222)',
  borderRadius: 4,
  fontSize: 13,
  height: 56,
  padding: '8px 8px 0',
  color: 'rgb(83, 100, 113)',

  ':focus-within': {
    color: 'red',
  },
});

export const input = style({
  width: '100%',
  border: 'none',
  fontSize: 17,
  marginTop: 16,
  padding: '12px 8px 8px',
  outline: 'none',
});

export const modalFooter = style({
  padding: '24px 80px',
});

export const actionButton = style({
  width: '100%',
  height: 50,
  borderRadius: 25,
  backgroundColor: 'rgb(15, 20, 25)',
  border: '1px solid white',
  color: 'white',
  fontSize: 17,
  cursor: 'pointer',

  ':disabled': {
    opacity: 0.5,
  },
  ':hover': {
    backgroundColor: 'rgb(39, 44, 48)',
  },
  selectors: {
    '&:disabled:hover': {
      backgroundColor: 'rgb(15, 20, 25)',
    },
  },
});

export const closeButton = style({
  width: 34,
  height: 34,
  borderRadius: 17,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#fff',
  position: 'absolute',
  left: 16,
  top: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  ':hover': {
    backgroundColor: 'rgba(15, 20, 25, 0.1)',
  },
});

export const message = style({
  color: 'red',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
});
