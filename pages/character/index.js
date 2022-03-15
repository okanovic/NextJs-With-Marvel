import { useRouter } from "next/router";

export default function Character(){
    const router = useRouter();

    const url = router.query;

    return (
        <div>Character: {url}</div>
    )
}