import { ProjectNote } from "../models/note.models.js"
import { Project } from "../models/project.models.js";
import {ApiResponse} from "../utils/api-response.js";
import {asyncHandler} from "../utils/async-handler.js";
import {ApiError} from "../utils/api-error.js";
import mongoose from "mongoose";

const createNote  = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;
    const {content} = req.body;
    const project  = await Project.findById(projectId);
    if(!project)
    {
        throw new ApiError(404,"Project not found");
    }
    const note = await ProjectNote.create({
        project,
        createdBy : new mongoose.Types.ObjectId(req.user._id),
        content,
    })
    return res.status(201).json(
        new ApiResponse(201,note,"Note created successfully")
    )
});
const getNotes  = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;
     const project  = await Project.findById(projectId);
    if(!project)
    {
        throw new ApiError(404,"Project not found");
    }
    const notes = await ProjectNote.find({
        project : new mongoose.Types.ObjectId(projectId)
    }).populate("createdBy","username fullName avatar")

    return res.status(200).json(
          new ApiResponse(200,notes,"notes fetched successfully")
    )

});
const getNoteById  = asyncHandler(async(req,res)=>{
    const {projectId, noteId} = req.params;

    const notes = await ProjectNote.findOne({
        _id : new mongoose.Types.ObjectId(noteId),
        project : new mongoose.Types.ObjectId(projectId),
    }).populate("createdBy","username fullName avatar");

    if(!notes)
    {
        throw new ApiError(404,"Notes not found");
    }

    return res.status(200).json(
        new ApiResponse(200,notes,"notes fetched successfully")
    )

});
const updateNote  = asyncHandler(async(req,res)=>{
    const { projectId, noteId } = req.params;
    const{content} = req.body;
    const notes = await ProjectNote.findByIdAndUpdate(
     {
         _id: new mongoose.Types.ObjectId(noteId),
        project: new mongoose.Types.ObjectId(projectId)
     },
     {
        content
     },
     {
        new: true,
        runValidators: true
     }
);
    if(!notes)
    {
        throw new ApiError(404,"Note not found");
    }
    return res.status(200).json(
        new ApiResponse(200,notes,"Note updated successfully")
    )
});
const deleteNote  = asyncHandler(async(req,res)=>{
    const {projectId,noteId} = req.params;
    const notes = await ProjectNote.findOneAndDelete(
        {
             _id: new mongoose.Types.ObjectId(noteId),
        project: new mongoose.Types.ObjectId(projectId)
        }
    );
     if(!notes)
    {
        throw new ApiError(404,"Note not found");
    }
    return res.status(200).json(
        new ApiResponse(200,notes,"Note deleted successfully")
    )
});
export {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
}