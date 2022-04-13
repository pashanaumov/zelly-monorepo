import React, { FC } from 'react';
import { Card, Headline, Subheading } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

interface Props {
  sectionTitle: string;
}

export const SectionHeading: FC<Props> = ({ sectionTitle }) => {
  return (
    <>
      <Card style={styles.container}>
        <View>
          <Headline style={styles.headlineText}>{sectionTitle}</Headline>
        </View>
        <View style={styles.subheadingContainer}>
          <Subheading>
            A list of all the companies in the Zelly database including their
            name, industry, country and last CO2 emission numbers.{' '}
          </Subheading>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: height / 5,
    width: '100%',
    padding: 16,
  },
  headlineText: {
    fontWeight: '600',
  },
  subheadingContainer: {
    marginTop: 16,
  },
});
