import ContentLoader from 'react-content-loader';

function CardSkeleton() {
  return (
    <ContentLoader
      speed={2}
      width={150}
      height={204}
      viewBox="0 0 150 190"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
      <rect x="0" y="110" rx="3" ry="3" width="150" height="15" />
      <rect x="0" y="130" rx="3" ry="3" width="100" height="15" />
      <rect x="0" y="165" rx="8" ry="8" width="80" height="24" />
      <rect x="118" y="157" rx="8" ry="8" width="32" height="32" />
    </ContentLoader>
  );
}

export default CardSkeleton;
