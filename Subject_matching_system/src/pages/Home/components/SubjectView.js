import {useEffect, useState} from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    TextField,
    FormGroup
} from "@mui/material";
import NavBar from "./navBar"



const srcData = [
    {
        id  : 0,
        SID : "20165160A",
        SubjectRelease: "SEHH2241",
        LectureGroupRelease:"201",
        SubjectWanted:"SEHH1016",
        LectureGroupWanted:"101"
    },
    {
        id : 1,
        SID : "20010001A",
        SubjectRelease:"SEHH1016",
        LectureGroupRelease:"101",
        SubjectWanted:"SEHH2241",
        LectureGroupWanted :"201"
    },
    {   id : 2,
        SID : "20010001A",
        SubjectRelease: "SEHH3326",
        LectureGroupRelease: "101",
        SubjectWanted: "LCH1047",
        LectureGroupWanted: "102"},
    {
        id  : 3,
        SID : "20165160A",
        SubjectRelease: "SEHH2241",
        LectureGroupRelease:"201",
        SubjectWanted:"SEHH1016",
        LectureGroupWanted:"101"
    },
    {
        id  : 4,
        SID : "21112111A",
        SubjectRelease: "SEHH2241",
        LectureGroupRelease:"201",
        SubjectWanted:"SEHH1016",
        LectureGroupWanted:"101"
    },
    {
        id  : 5,
        SID : "20020202A",
        SubjectRelease: "SEHH2241",
        LectureGroupRelease:"201",
        SubjectWanted:"SEHH1016",
        LectureGroupWanted:"101"
    }
];
const fields = [
    /*{ id: 0, title: "Student No.", key: "SID" },*/
    { id: 1, title: "Subject Releasing", key: "SubjectRelease" },
    { id: 2, title: "Lecture Group of the releasing subject", key: "LectureGroupRelease" },
    { id: 3, title: "Subject Wanted", key: "SubjectWanted" },
    { id: 4, title: "Lecture Group of wanted subject", key: "LectureGroupWanted" }
];

export default function App() {


    const MatchButton = ({ handleClick }) => (
        <IconButton onClick={handleClick}>
            <i className="material-icons">Match</i>
        </IconButton>
    );

    const MatchDialog = ({
                              isOpen,
                              onDialogClose,
                              onConfirmMatch,
                              recordId
                          }) => (
        <Dialog open={isOpen} onClose={onDialogClose}>
            <DialogTitle>Matching</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Is this record match with your request?
                </DialogContentText>
                <FormGroup>
                    <Button onClick={() => onConfirmMatch(recordId)}>Yes</Button>
                    <Button onClick={onDialogClose}>No</Button>
                </FormGroup>
            </DialogContent>
        </Dialog>
    );

    const Header = ({ columnTitles }) => (
        <TableHead>
            <TableRow>
                {columnTitles.map(({ title, id }) => (
                    <TableCell key={id}>{title}</TableCell>
                ))}
                <TableCell>Action</TableCell>
            </TableRow>
        </TableHead>
    );

    const Row = ({ rowData, columns, onMatch }) => (
        <TableRow>
            {columns.map(({ key }, i) => (
                <TableCell key={i}>{rowData[key]}</TableCell>
            ))}
            <TableCell>
                <MatchButton handleClick={() => onMatch(rowData.id)} />
            </TableCell>
        </TableRow>
    );

    const [tableData, setTableData] = useState(srcData);
    const [dataFields, setDataFields] = useState(fields);
    const [matchDialogOn, setMatchDialogOn] = useState(false);
    const [recordIdToMatch, setRecordIdToMatch] = useState();

    const onMatchDialogOpen = (id) => (
        setRecordIdToMatch(id), setMatchDialogOn(true)
    );

    const handleMatch = (idRecordToMatch) => {
        setMatchDialogOn(false);
        const tableDataCopy = [...tableData];
        setTableData(tableDataCopy.filter(({ id }) => id != recordIdToMatch));
    };

    return (
        <div>
            <NavBar/>
            <MatchDialog
                isOpen={matchDialogOn}
                onDialogClose={() => setMatchDialogOn(false)}
                onConfirmMatch={handleMatch}
                recordId={recordIdToMatch}
            />

            <TableContainer>
                <Table>
                    <Header columnTitles={dataFields} />
                    <TableBody>
                        {tableData.map((data) => (
                            <Row
                                key={data.id}
                                rowData={data}
                                columns={dataFields}
                                onMatch={onMatchDialogOpen}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
