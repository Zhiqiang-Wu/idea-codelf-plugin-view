import { useCreation, useMemoizedFn } from 'ahooks';
import { Button, Dropdown, Spin } from 'antd';
import { TagCloud } from 'react-tagcloud';

const HomeView = ({
    tags,
    spinning,
}: {
    tags: Array<any>;
    spinning: boolean;
}) => {
    const colors = useCreation(() => {
        return ['red', 'orange', 'olive', 'green', 'teal', 'blue', 'purple'];
    }, []);

    const randomColor = useMemoizedFn(() => {
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    });

    const getItems = useMemoizedFn((tag) => [
        {
            key: '1',
            label: (
                <a target="_blank" href={tag.repo} rel="noreferrer">
                    Repo
                </a>
            ),
        },
        {
            key: '2',
            disabled: true,
            label: <span>[{tag.language}]</span>,
        },
    ]);

    const renderer = useMemoizedFn((tag) => {
        return (
            <Dropdown arrow key={tag.value} menu={{ items: getItems(tag) }}>
                <Button
                    shape="round"
                    style={{
                        fontWeight: 'bold',
                        margin: 2,
                        backgroundColor: randomColor(),
                        border: 'none',
                        color: 'white',
                    }}
                >
                    {tag.value}
                </Button>
            </Dropdown>
        );
    });

    return (
        <>
            <TagCloud
                tags={tags}
                maxSize={50}
                minSize={20}
                renderer={renderer}
            />
            <Spin size="large" fullscreen spinning={spinning} />
        </>
    );
};

export default HomeView;
