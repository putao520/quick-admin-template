import { useContext } from 'react'
import { SettingsContext, type SettingsContextValue } from 'src/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
