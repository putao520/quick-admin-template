// ** Theme Type Import
import { type PaletteMode, type ThemeOptions } from '@mui/material'

const Shadows = (mode: PaletteMode): ThemeOptions['shadows'] => {
  // MUI v7 要求使用标准的 RGB 格式
  // 定义颜色变量
  const lightRGB = { r: 58, g: 53, b: 65 }
  
  if (mode === 'light') {
    return [
      'none',
      `0px 2px 1px -1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 1px 1px 0px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 1px 3px 0px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 3px 1px -2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 2px 2px 0px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 1px 5px 0px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 4px 8px -4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.42)`,
      `0px 6px 18px -8px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.56)`,
      `0px 3px 5px -1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 5px 8px 0px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 1px 14px 0px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 2px 10px 0px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.1)`,
      `0px 4px 5px -2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 7px 10px 1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 2px 16px 1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 5px 5px -3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 8px 10px 1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 3px 14px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 5px 6px -3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 9px 12px 1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 3px 16px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 6px 6px -3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 10px 14px 1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 4px 18px 3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 6px 7px -4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 11px 15px 1px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 4px 20px 3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 7px 8px -4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 12px 17px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 5px 22px 4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 7px 8px -4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 13px 19px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 5px 24px 4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 7px 9px -4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 14px 21px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 5px 26px 4px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 8px 9px -5px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 15px 22px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 6px 28px 5px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 8px 10px -5px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 16px 24px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 6px 30px 5px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 8px 11px -5px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 17px 26px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 6px 32px 5px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 9px 11px -5px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 18px 28px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 7px 34px 6px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 9px 12px -6px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 19px 29px 2px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 7px 36px 6px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 10px 13px -6px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 20px 31px 3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 8px 38px 7px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 10px 13px -6px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 21px 33px 3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 8px 40px 7px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 10px 14px -6px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 22px 35px 3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 8px 42px 7px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 11px 14px -7px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 23px 36px 3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 9px 44px 8px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`,
      `0px 11px 15px -7px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.2), 0px 24px 38px 3px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.14), 0px 9px 46px 8px rgba(${lightRGB.r}, ${lightRGB.g}, ${lightRGB.b}, 0.12)`
    ]
  } else {
    // 暗色模式下的颜色变量
    const darkRGB = { r: 19, g: 17, b: 32 }
    
    return [
      'none',
      `0px 2px 1px -1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 1px 1px 0px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 1px 3px 0px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 3px 1px -2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 2px 2px 0px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 1px 5px 0px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 4px 8px -4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.42)`,
      `0px 6px 18px -8px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.56)`,
      `0px 3px 5px -1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 5px 8px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 1px 14px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 2px 10px 0px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.1)`,
      `0px 4px 5px -2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 7px 10px 1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 2px 16px 1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 5px 5px -3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 8px 10px 1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 3px 14px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 5px 6px -3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 9px 12px 1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 3px 16px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 6px 6px -3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 10px 14px 1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 4px 18px 3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 6px 7px -4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 11px 15px 1px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 4px 20px 3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 7px 8px -4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 12px 17px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 5px 22px 4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 7px 8px -4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 13px 19px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 5px 24px 4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 7px 9px -4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 14px 21px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 5px 26px 4px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 8px 9px -5px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 15px 22px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 6px 28px 5px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 8px 10px -5px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 16px 24px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 6px 30px 5px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 8px 11px -5px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 17px 26px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 6px 32px 5px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 9px 11px -5px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 18px 28px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 7px 34px 6px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 9px 12px -6px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 19px 29px 2px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 7px 36px 6px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 10px 13px -6px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 20px 31px 3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 8px 38px 7px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 10px 13px -6px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 21px 33px 3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 8px 40px 7px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 10px 14px -6px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 22px 35px 3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 8px 42px 7px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 11px 14px -7px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 23px 36px 3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 9px 44px 8px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`,
      `0px 11px 15px -7px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.2), 0px 24px 38px 3px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.14), 0px 9px 46px 8px rgba(${darkRGB.r}, ${darkRGB.g}, ${darkRGB.b}, 0.12)`
    ]
  }
}
export default Shadows
