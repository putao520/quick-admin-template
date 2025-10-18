import type { GridSize } from '@mui/material/Grid'

declare module '@mui/material/Grid' {
  interface GridProps {
    /**
     * Legacy flag preserved for backward compatibility. No longer used by the runtime,
     * but retained here to avoid breaking existing layout components during the upgrade.
     */
    item?: boolean
    container?: boolean
    xs?: GridSize
    sm?: GridSize
    md?: GridSize
    lg?: GridSize
    xl?: GridSize
  }
}
