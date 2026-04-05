import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Your custom SF logo style
      <div
        style={{
          fontSize: 16,
          background: '#fbbf24', // bg-amber-300
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          borderRadius: '50%',
          fontWeight: 900,
        }}
      >
        SF
      </div>
    ),
    {
      ...size,
    }
  )
}
