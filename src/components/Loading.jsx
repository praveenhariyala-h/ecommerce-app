import { useSpring, animated } from 'react-spring';

const Loading = () => {
  const styles = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 1000 },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <animated.div
        style={styles}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;
    