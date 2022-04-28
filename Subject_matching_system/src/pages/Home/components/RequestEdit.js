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
import './RequestEdit.css'



const subjectData = [
    {
        id  : 0,
        SID : "20010001A",
        SubjectRelease: "SEHH2241",
        LectureGroupRelease:"201",
        SubjectWanted:"SEHH1016",
        LectureGroupWanted:"101"
    },
    {
        id : 1,
        SID : "20010001A",
        SubjectRelease:"SEHH1071",
        LectureGroupRelease:"101",
        SubjectWanted:"SEHH2345",
        LectureGroupWanted :"201"
    },
    {   id : 2,
        SID : "20010001A",
        SubjectRelease: "SEHH3326",
        LectureGroupRelease: "101",
        SubjectWanted: "LCH1047",
        LectureGroupWanted: "102"}
];
const fields = [
    /*{ id: 0, title: "Student No.", key: "SID" },*/
    { id: 1, title: "Subject Releasing", key: "SubjectRelease" },
    { id: 2, title: "Lecture Group of the releasing subject", key: "LectureGroupRelease" },
    { id: 3, title: "Subject Wanted", key: "SubjectWanted" },
    { id: 4, title: "Lecture Group of wanted subject", key: "LectureGroupWanted" }
];

export default function App() {



    const EditButton = ({ handleClick }) => (
        <IconButton onClick={handleClick}>
            <i className="material-icons">Edit</i>
        </IconButton>
    );

    const DeleteButton = ({ handleClick }) => (
        <IconButton onClick={handleClick}>
            <i className="material-icons">delete</i>
        </IconButton>
    );

    const DeleteDialog = ({
                              isOpen,
                              onDialogClose,
                              onConfirmDelete,
                              recordId
                          }) => (
        <Dialog open={isOpen} onClose={onDialogClose}>
            <DialogTitle>Delete record</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this record?
                </DialogContentText>
                <FormGroup>
                    <Button onClick={() => onConfirmDelete(recordId)}>Yes</Button>
                    <Button onClick={onDialogClose}>No</Button>
                </FormGroup>
            </DialogContent>
        </Dialog>
    );

    const EditDialog = ({
                            isOpen,
                            onDialogClose,
                            onSubmitEdit,
                            recordData,
                            fields
                        }) => {
        const [data, setData] = useState(recordData),
            handleEdit = (key, value) => setData({ ...data, [key]: value });
        return (
            <Dialog open={isOpen} onClose={onDialogClose}>
                <DialogTitle>Edit record</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {fields.map(({ key, title }) => (
                            <TextField
                                key={key}
                                defaultValue={recordData[key]}
                                label={title}
                                onChange={({ target: { value } }) => handleEdit(key, value)}
                            />
                        ))}
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={() => onSubmitEdit({ ...recordData, ...data })}>
                            Submit
                        </Button>
                        <Button onClick={() => onDialogClose()}>Cancel</Button>
                    </FormGroup>
                </DialogContent>
            </Dialog>
        );
    };

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

    const Row = ({ rowData, columns, onEdit, onDelete }) => (
        <TableRow>
            {columns.map(({ key }, i) => (
                <TableCell key={i}>{rowData[key]}</TableCell>
            ))}
            <TableCell>
                <EditButton handleClick={() => onEdit(rowData.id)} />
                <DeleteButton handleClick={() => onDelete(rowData.id)} />
            </TableCell>
        </TableRow>
    );

    const [tableData, setTableData] = useState(subjectData);
    const [dataFields, setDataFields] = useState(fields);
    const [deleteDialogOn, setDeleteDialogOn] = useState(false);
    const [editDialogOn, setEditDialogOn] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState();
    const [recordIdToEdit, setRecordIdToEdit] = useState();
    const onEditDialogOpen = (id) => (
        setRecordIdToEdit(id), setEditDialogOn(true)
    );
    const onDeleteDialogOpen = (id) => (
        setRecordIdToDelete(id), setDeleteDialogOn(true)
    );
    const handleEdit = (data) => {
        setEditDialogOn(false);
        const tableDataCopy = [...tableData],
            editedItemIdx = tableDataCopy.findIndex(({ id }) => id == data.id);
        tableDataCopy.splice(editedItemIdx, 1, data);
        setTableData(tableDataCopy);
    };
    const handleDelete = (idRecordToDelete) => {
        setDeleteDialogOn(false);
        const tableDataCopy = [...tableData];
        setTableData(tableDataCopy.filter(({ id }) => id != recordIdToDelete));
    };

    return (
        <div>
            <NavBar/>
            <div className="request-wrapper">
                    <DeleteDialog
                        isOpen={deleteDialogOn}
                        onDialogClose={() => setDeleteDialogOn(false)}
                        onConfirmDelete={handleDelete}
                        recordId={recordIdToDelete}
                    />
                    <EditDialog
                        isOpen={editDialogOn}
                        onDialogClose={() => setEditDialogOn(false)}
                        onSubmitEdit={handleEdit}
                        recordData={tableData.find(({ id }) => id == recordIdToEdit) || {}}
                        fields={dataFields}
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
                                        onEdit={onEditDialogOpen}
                                        onDelete={onDeleteDialogOpen}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

        </div>
    );
}
