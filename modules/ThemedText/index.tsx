import Sizes from '@/constants/Sizes';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Text, type TextProps } from 'react-native';

export default function ThemedText({
  style,
  ...rest
}: TextProps) {
  const themeColors = useThemeColors();
  return (
    <Text
      style={[
        { fontSize: Sizes.fonts.medium },
        style,
        { color: themeColors.foreground },
      ]}
      {...rest}
    />
  );
}
