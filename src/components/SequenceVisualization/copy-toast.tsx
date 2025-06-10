import type { SnackbarProps } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import { memo, useEffect, useState, type RefObject } from 'react'

interface CopyToastProps extends SnackbarProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

const CopyToast = memo(({containerRef, ...props}: CopyToastProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCopy = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      navigator.clipboard.writeText(selection.toString().trim())
      setSnackbarOpen(true)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseup", handleCopy)
      return () => {
        container.removeEventListener("mouseup", handleCopy)
      }
    }
  }, [containerRef])

  return (
    <Snackbar
      autoHideDuration={1000}
      message="Sequence copied to clipboard"
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      {...props}
      open={snackbarOpen}
      onClose={handleCloseSnackbar}
    />
  );
});

export default CopyToast