// Modules

// Types
interface Props {
  topNumber?: number;
  text: string;
  color: string;
}

const StatCard = ({ color, topNumber, text }: Props) => {
  return (
    <div className={`statcard ${color}`}>
      <span>{topNumber}</span>
      <p>{text}</p>
    </div>
  );
};

export default StatCard;
