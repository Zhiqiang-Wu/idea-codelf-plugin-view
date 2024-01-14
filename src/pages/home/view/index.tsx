import loading from '@/assets/loading.svg';
import { useCreation, useMemoizedFn } from 'ahooks';
import { Button, ConfigProvider, Dropdown, Image, Spin } from 'antd';
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

    const tagsProcessed: Array<any> = useCreation(() => {
        return tags.map((value) => {
            return {
                ...value,
                count: 1,
                color: randomColor(),
                items: getItems(value),
            };
        });
    }, [tags]);

    const renderer = useMemoizedFn((tag) => {
        return (
            <Dropdown arrow key={tag.value} menu={{ items: tag.items }}>
                <Button
                    shape="round"
                    style={{
                        fontWeight: 'bold',
                        margin: 2,
                        backgroundColor: tag.color,
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
                tags={tagsProcessed}
                maxSize={50}
                minSize={20}
                renderer={renderer}
            />
            <ConfigProvider
                theme={{ token: { colorBgMask: 'rgba(0, 0, 0, 0)' } }}
            >
                <Spin
                    indicator={
                        <Image
                            preview={false}
                            style={{ width: 150, height: 150 }}
                            src={loading}
                        />
                    }
                    fullscreen
                    spinning={spinning}
                />
            </ConfigProvider>
        </>
    );
};

export default HomeView;
