import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from '@util/ErrorResponse';
import { Cinema, ICinema } from '@model/cinema.model';
import {

} from "@schema/cinema.schema"

export const getAllCinemas = catchAsyncErrors(async () => {

})

export const getCinemaById = catchAsyncErrors(async () => {

})

export const createCinema = catchAsyncErrors(async () => {

})

export const updateCinema = catchAsyncErrors(async () => {

})

export const deleteCinema = catchAsyncErrors(async () => {

})