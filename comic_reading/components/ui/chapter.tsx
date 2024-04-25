import { useState} from "react";
import { Document, Page } from 'react-pdf';

const Chapter = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onDocumentLoadSuccess = ({numPages: numPages}) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () => setPageNumber((prevPage) => prevPage - 1);
    const goToNextPage = () => setPageNumber((prevPage) => prevPage + 1);

    return (
        <div>
            <nav>
                <button onClick={goToPrevPage}>Prev</button>
                <button onClick={goToNextPage}>Next</button>
            </nav>

            <div style={{ width: 600 }}>
                <Document
                    file="/[Ning_s_Basement]_Vol._1_Ch._1.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} width={600} />
                </Document>
            </div>

            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
}

export default Chapter;