import '../../src/_theme.scss';

import { Button } from '../../src/Common/Button/Button';
import { Card } from '../../src/Common/Card/Card';
import { Checkbox } from '../../src/Common/Checkbox/Checkbox';
import { GenreList } from '../../src/Movie/GenreList/GenreList';
import React from 'react';
import { TMDBGenre } from '../../src/Api/TMDB/TMDBGenre';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';

storiesOf('Components', module)
  .add('Button', () => [
    <Button onClick={action('clicked')}>Button</Button>,
    <Button onClick={action('clicked')} dense>Dense</Button>,
    <Button onClick={action('clicked')} compact>Compact</Button>,
    <Button onClick={action('clicked')} primary>Primary</Button>,
    <Button onClick={action('clicked')} secondary>Secondary</Button>,
  ])
  .add('Card', () => [
    <Card title="Title" subtitle="Subtitle" />,
    <Card title="Title Large" subtitle="Subtitle" titleLarge />,
    <Card title="Avatar" subtitle="Subtitle" avatar={<span style={{ display: 'inline-block', height: '40px', width: '40px', background: '#999', borderRadius: '50%' }} />} />,
  ])
  .add('Form', () => [
    <Checkbox label="Label" />
  ])

const aGenre = new TMDBGenre(1, 'A genre');

storiesOf('Movie', module)
  .add('GenreList', () => <GenreList genreIds={[aGenre.id]} data={{ [aGenre.id]: aGenre }} />);

