import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface DeviationMeterProps {
  deviation: number; // Cents offset from target
  stringFreq: number; // Target frequency
  stringName: string; // E, A, D, G, B, E
  maxCents?: number; // How far the meter can swing (default: 50 cents)
}

const DeviationMeter: React.FC<DeviationMeterProps> = ({ deviation, stringFreq, stringName, maxCents = 50 }) => {
  const cents = deviation; // deviation is already in cents
  const absCents = Math.abs(cents);
  const inTune = absCents < 15;
  const color = inTune ? '#22c55e' : '#ef4444';
  let feedback = 'In Tune';
  if (!inTune) feedback = cents < 0 ? 'Flat' : 'Sharp';

  // SVG dimensions
  const size = 180;
  const center = size / 2;
  const radius = 70;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        {/* Full circle, color depends on tuning */}
        <Circle cx={center} cy={center} r={radius} stroke={color} strokeWidth={16} fill="#1e293b" />
      </Svg>
      <View style={{ position: 'absolute', top: center - 32, left: 0, right: 0, alignItems: 'center' }}>
        <Text style={{ color: '#f8fafc', fontSize: 64, fontWeight: 'bold', letterSpacing: 2 }}>{stringName}</Text>
      </View>
      <Text style={{ color, fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>{feedback}</Text>
      <Text style={{ color: '#cbd5e1', fontSize: 16 }}>
        {cents > 0 ? '+' : ''}{cents.toFixed(1)} cents
      </Text>
    </View>
  );
};

export default DeviationMeter; 