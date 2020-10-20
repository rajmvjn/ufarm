import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Delete,
  Res,
  HttpStatus,
  Logger,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { MulterFile } from 'multer';
import { Response } from 'express';
import * as admin from 'firebase-admin';

import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-dto';
import { category_module_content } from './category-module-content';
import { constants } from '../constants';
import {
  imageFileFilter,
  editFileName,
  uploadImageToStorage,
} from '../shared/utils/file-upload.util';
import { ApiCategory } from './decorators/category-decorator';
import { processResponse } from 'src/shared/utils/util';
import { FirestoreService } from '../firestore/firestore.service';
import * as config from '../config/configuration';

@Controller('v1')
@ApiTags('Category')
export class CategoryController {
  private storageBucket: any;
  constructor(
    private readonly categoryService: CategoryService,
    private readonly firestoreService: FirestoreService,
  ) {
    this.storageBucket = admin.storage().bucket();
  }

  /**
   * Function to create new category based on the provided data
   * @param createCategoryDto : CategoryDto
   * @param file: MulterFile
   * @param response: Response
   */
  @Post('category')
  @ApiOperation({ summary: 'Create category' })
  @UseInterceptors(
    FileInterceptor('category_image', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: config.default().UPLOAD_LIMIT_MB * 1024 * 1024, // Allowed file upload size is 5mb can be configurable
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiCategory('category_image')
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CategoryDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async createCategory(
    @Body() createCategoryDto: CategoryDto,
    @UploadedFile() catImage: MulterFile,
    @Res() response: Response,
  ): Promise<Response> {
    createCategoryDto.image_url = catImage.filename;
    // Image upload to firebase store
    catImage.filename = editFileName(catImage);
    createCategoryDto.image_url = catImage.filename;
    uploadImageToStorage(catImage, this.storageBucket);

    return this.categoryService
      .createCategory(createCategoryDto)
      .then(catCreateResponse => {
        Logger.log(
          category_module_content.category_add_success_message,
          JSON.stringify(createCategoryDto),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: category_module_content.category_add_success_message,
          _id: catCreateResponse['id'],
          image_url: catCreateResponse.image_url,
        });
      });
  }

  /**
   * Function to update category based on the categoryId
   * @param updateCategoryDto : CategoryDto
   * @param categoryId: string
   * @param res: Response
   */
  @Put('category/:categoryId')
  @UseInterceptors(
    FileInterceptor('category_image', {
      fileFilter: imageFileFilter,
      limits: {
        fileSize: config.default().UPLOAD_LIMIT_MB * 1024 * 1024, // Allowed file upload size is 5mb can be configurable
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiCategory('category_image')
  @ApiOperation({ summary: 'Update Category based on provided category Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async updateCategory(
    @Body() updateCategoryDto: CategoryDto,
    @UploadedFile() catImage: MulterFile,
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<any> {
    if (catImage) {
      catImage.filename = editFileName(catImage);
      updateCategoryDto.image_url = catImage.filename;
      uploadImageToStorage(catImage, this.storageBucket);
    }
    updateCategoryDto.date_updated = this.firestoreService.timestamp();
    return this.categoryService
      .updateCategory(updateCategoryDto, categoryId)
      .then(() => {
        res.send({
          _id: categoryId,
          ...updateCategoryDto,
        });
      });
  }

  /**
   * Function to get all categories
   * @param res: Response
   */
  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
  public async getAll(@Res() res: Response): Promise<any> {
    return this.categoryService.getAllCategory().then(getAllData => {
      const getAllResult = processResponse(getAllData);
      Logger.log(
        category_module_content.get_all_category_success_message,
        JSON.stringify(getAllResult),
      );
      res.send(getAllResult);
    });
  }

  /**
   * Function to get category by Id
   * @param categoryId: string
   * @param res: Response
   */
  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get category by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async getCategory(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.categoryService
      .getCategory(categoryId)
      .then(getCategoryData => {
        Logger.log(
          category_module_content.get_category_success_message,
          JSON.stringify(categoryId),
        );
        res.send({
          _id: getCategoryData.id,
          ...getCategoryData.data(),
        });
      });
  }

  /**
   * Function to delete category by Id
   * @param categoryId: string
   * @param response: Response
   */
  @Delete('category/:categoryId')
  @ApiOperation({ summary: 'Delete category by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: constants.no_content,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  public async deleteCategory(
    @Param('categoryId') categoryId: string,
    @Res() response: Response,
  ): Promise<Response> {
    return this.categoryService.deleteCategory(categoryId).then(() => {
      Logger.log(
        category_module_content.category_delete_success_message,
        JSON.stringify(categoryId),
      );
      return response
        .status(HttpStatus.NO_CONTENT)
        .send(category_module_content.category_delete_success_message);
    });
  }
}
