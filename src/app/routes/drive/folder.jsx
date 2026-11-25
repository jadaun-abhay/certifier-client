import { useParams } from "react-router";
import DriveExplorer from "@/features/drive/components/DriveExplorer";

export default function FolderPage() {
    const { folderId } = useParams();
    return <DriveExplorer key={folderId} folderId={Number(folderId)} />;
}
