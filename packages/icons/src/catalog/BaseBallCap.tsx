const BaseBallCap = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      {...props}
    >
      <path d="M 25 1 C 23.726563 1 22.574219 1.300781 21.65625 1.875 C 21.109375 2.214844 20.613281 2.660156 20.3125 3.21875 C 15.011719 3.886719 10.253906 5.714844 6.78125 8.8125 C 3.183594 12.019531 1 16.636719 1 22.4375 L 1 33.21875 C 0.996094 33.261719 0.996094 33.300781 1 33.34375 L 1 33.375 C 1 33.386719 1 33.394531 1 33.40625 C 1 33.480469 1.015625 33.574219 1.03125 33.65625 C 1.070313 34.222656 1.222656 34.792969 1.46875 35.5625 C 1.75 36.441406 2.140625 37.484375 2.59375 38.59375 C 3.503906 40.816406 4.667969 43.285156 5.75 45.03125 C 6.742188 46.628906 7.753906 47.570313 9 47.875 C 10.246094 48.179688 11.4375 47.839844 12.75 47.375 C 15.375 46.449219 18.820313 44.875 25 44.875 C 31.179688 44.875 34.558594 46.449219 37.15625 47.375 C 38.453125 47.839844 39.621094 48.179688 40.875 47.875 C 42.128906 47.570313 43.164063 46.652344 44.21875 45.0625 C 45.160156 43.644531 46.296875 41.191406 47.25 38.875 C 47.726563 37.714844 48.160156 36.589844 48.46875 35.65625 C 48.738281 34.839844 48.921875 34.253906 48.96875 33.65625 C 48.988281 33.5625 49 33.460938 49 33.375 L 49 22.4375 C 49 16.621094 46.816406 12.023438 43.21875 8.8125 C 39.742188 5.710938 35.007813 3.875 29.6875 3.21875 C 29.386719 2.660156 28.890625 2.214844 28.34375 1.875 C 27.425781 1.300781 26.273438 1 25 1 Z M 25 3 C 25.9375 3 26.78125 3.261719 27.3125 3.59375 C 27.84375 3.925781 28 4.242188 28 4.5 C 28 4.757813 27.84375 5.074219 27.3125 5.40625 C 26.78125 5.738281 25.9375 6 25 6 C 24.0625 6 23.21875 5.738281 22.6875 5.40625 C 22.15625 5.074219 22 4.757813 22 4.5 C 22 4.242188 22.15625 3.925781 22.6875 3.59375 C 23.21875 3.261719 24.0625 3 25 3 Z M 29.875 5.28125 C 34.699219 5.941406 38.875 7.605469 41.875 10.28125 C 45.074219 13.136719 47 17.109375 47 22.4375 L 47 32.59375 C 46.820313 32.550781 46.765625 32.558594 46.5 32.46875 C 45.402344 32.089844 43.703125 31.34375 41.59375 30.53125 C 37.371094 28.910156 31.472656 27 24.9375 27 C 18.398438 27 12.542969 28.957031 8.34375 30.59375 C 6.246094 31.410156 4.550781 32.128906 3.46875 32.5 C 3.214844 32.585938 3.171875 32.585938 3 32.625 L 3 22.4375 C 3 17.128906 4.925781 13.164063 8.125 10.3125 C 11.125 7.636719 15.3125 5.984375 20.125 5.3125 C 20.375 6.074219 20.96875 6.695313 21.65625 7.125 C 22.574219 7.699219 23.726563 8 25 8 C 26.273438 8 27.425781 7.699219 28.34375 7.125 C 29.039063 6.691406 29.628906 6.054688 29.875 5.28125 Z M 25.40625 11 C 22.957031 11 21.148438 11.949219 20.40625 13.84375 C 20.121094 14.613281 20 15.222656 20 17 C 20 18.777344 20.121094 19.386719 20.40625 20.15625 C 21.148438 22.050781 22.957031 23 25.40625 23 C 27.503906 23 29.019531 22.199219 29.71875 21.15625 C 29.882813 20.917969 30 20.679688 30 20.40625 C 30 19.738281 29.386719 19.28125 28.625 19.28125 C 28.109375 19.28125 27.691406 19.460938 27.28125 19.9375 C 26.765625 20.519531 26.292969 20.78125 25.40625 20.78125 C 24.273438 20.78125 23.589844 20.285156 23.28125 19.5 C 23.117188 19.070313 23.0625 18.65625 23.0625 17 C 23.0625 15.34375 23.117188 14.925781 23.28125 14.5 C 23.589844 13.714844 24.273438 13.21875 25.40625 13.21875 C 26.292969 13.21875 26.765625 13.480469 27.28125 14.0625 C 27.691406 14.539063 28.109375 14.71875 28.625 14.71875 C 29.386719 14.71875 30 14.261719 30 13.59375 C 30 13.320313 29.882813 13.082031 29.71875 12.84375 C 29.019531 11.800781 27.503906 11 25.40625 11 Z M 24.9375 29 C 31.078125 29 36.742188 30.816406 40.875 32.40625 C 42.941406 33.199219 44.601563 33.945313 45.84375 34.375 C 46.132813 34.472656 46.402344 34.558594 46.65625 34.625 C 46.613281 34.765625 46.613281 34.878906 46.5625 35.03125 C 46.273438 35.902344 45.867188 37 45.40625 38.125 C 44.480469 40.375 43.316406 42.796875 42.5625 43.9375 C 41.636719 45.332031 40.988281 45.796875 40.40625 45.9375 C 39.824219 46.078125 39.03125 45.933594 37.8125 45.5 C 35.375 44.628906 31.523438 42.875 25 42.875 C 18.476563 42.875 14.566406 44.628906 12.09375 45.5 C 10.859375 45.9375 10.066406 46.078125 9.5 45.9375 C 8.933594 45.796875 8.300781 45.359375 7.4375 43.96875 C 6.464844 42.398438 5.347656 39.988281 4.46875 37.84375 C 4.03125 36.769531 3.632813 35.777344 3.375 34.96875 C 3.339844 34.859375 3.3125 34.792969 3.28125 34.6875 C 3.546875 34.621094 3.824219 34.507813 4.125 34.40625 C 5.367188 33.980469 7.039063 33.238281 9.09375 32.4375 C 13.203125 30.835938 18.796875 29 24.9375 29 Z"></path>
    </svg>
  )
}

export default BaseBallCap