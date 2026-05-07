import { Link } from 'react-router';

function Button({ children, onClick, disabled, to, type = 'primary' }) {
  const styles = {
    base: 'text-sm inline-block rounded-full font-semibold uppercase outline-none transition-colors duration-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed',
    primary:
      'px-4 py-3 md:px-6 md:py-4 bg-yellow-400  text-stone-800 hover:bg-yellow-500 focus:ring-yellow-400 focus:ring-yellow-300 hover:bg-yellow-300 hover:text-stone-700',
    secondary:
      'px-4 py-3 md:px-6 md:py-4 border-2 border-stone-400 bg-transparent text-stone-400 hover:bg-stone-300 hover:text-stone-500 focus:ring-stone-400 focus:ring-offset-2',
    small:
      'px-4 py-2 md:px-5 md:py-2.5 text-xs bg-yellow-400  text-stone-800 hover:bg-yellow-500 focus:ring-yellow-400 focus:ring-yellow-300 hover:bg-yellow-300 hover:text-stone-700',
    xsmall:
      'px-3.5 py-1 md:px-4 md:py-1.5 text-xs bg-yellow-400  text-stone-800 hover:bg-yellow-500 focus:ring-yellow-400 focus:ring-yellow-300 hover:bg-yellow-300 hover:text-stone-700',
  };

  let className = styles.base;
  className += ' ' + styles[type];

  // const className =
  //   type === 'small'
  //     ? styles.small + ' ' + styles.base
  //     : type === 'primary'
  //       ? styles.primary + ' ' + styles.base
  //       : type === 'secondary'
  //         ? styles.secondary + ' ' + styles.base
  //         : styles.base;

  if (to) {
    return (
      <Link
        to={to}
        className={
          className + `${disabled ? ' pointer-events-none opacity-70' : ''}`
        }
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={className + `${disabled ? ' opacity-70 grayscale' : ''}`}
      >
        {children}
      </button>
    );
  }
}

export default Button;
