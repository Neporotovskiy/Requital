import React from 'react';
import Link from 'next/link';

import { Preview } from 'common/fixtures/projects';
import { Card } from 'components/card';
import { Button } from 'components/button';

import s from './styles.scss';

export const Project: React.FunctionComponent<Preview> = ({
    name,
    description,
    background,
    slug,
}: Preview): React.ReactElement => (
    <Card className={s.project} style={{ backgroundImage: `url("${background}")` }}>
        <div className={s.description}>
            <h1>{name}</h1>
            <p>{description}</p>
            <Link href="/projects/[project]" as={`/projects/${slug}`}>
                <Button blue />
            </Link>
        </div>
    </Card>
);
