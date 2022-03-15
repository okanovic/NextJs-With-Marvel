import { useRouter } from "next/router";

export default function CharacterDetail(){
    const router = useRouter();

    const url = router.query;

    return (
        <div>Character: {url}</div>
    )
}