import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ mt: 4, py: 2, textAlign: 'center', color: 'text.secondary' }}
    >
      <Typography variant="caption">Version {__APP_VERSION__}</Typography>
    </Box>
  )
}
