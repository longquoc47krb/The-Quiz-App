import { SplideSlide } from '@splidejs/react-splide';

const ResultItemWrap = ({ children }) => {
  const gapSize = '1rem';
  const previewColumns = 3;
  return (
    <SplideSlide
      style={{
        marginRight: gapSize,
        width: `calc(((100% + ${gapSize}) / ${previewColumns}) - ${gapSize})`,
        height: '100%',
      }}
    >
      {children}
    </SplideSlide>
  );
};

export default ResultItemWrap;
