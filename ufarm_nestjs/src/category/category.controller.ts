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

import { diskStorage, MulterFile } from 'multer';
import { Response } from 'express';

import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-dto';
import { ICategory } from './interfaces/category.interface';
import { category_module_content } from './category-module-content';
import { constants } from '../constants';
import {
  imageFileFilter,
  editFileName,
} from '../shared/utils/file-upload.util';
import { ApiCategory } from './decorators/category-decorator';

@Controller('v1')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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
      storage: diskStorage({
        destination: `./${constants.IMAGE_FOLDER}`,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
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
    return this.categoryService
      .createCategory(createCategoryDto)
      .then(catCreateResponse => {
        Logger.log(
          category_module_content.category_add_success_message,
          JSON.stringify(catCreateResponse),
        );
        return response.status(HttpStatus.CREATED).send({
          success: true,
          message: category_module_content.category_add_success_message,
          _id: catCreateResponse['_id'],
          image_url: catCreateResponse.image_url,
        });
      });
  }

  /**
   * Function to update category based on the categoryId
   * @param updateCategoryDto : CategoryDto
   * @param categoryId: string
   */
  @Put('category/:categoryId')
  @UseInterceptors(
    FileInterceptor('category_image', {
      storage: diskStorage({
        destination: `./${constants.IMAGE_FOLDER}`,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
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
  ): Promise<ICategory> {
    if (catImage) {
      updateCategoryDto.image_url = catImage.filename;
    }
    return this.categoryService.updateCategory(updateCategoryDto, categoryId);
  }

  /**
   * Function to get all categories
   *
   */
  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
  public async getAll(): Promise<ICategory[]> {
    return this.categoryService.getAllCategory();
  }

  /**
   * Function to get category by Id
   * @param categoryId: string
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
  ): Promise<ICategory[]> {
    return this.categoryService.getCategory(categoryId);
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
    return this.categoryService
      .deleteCategory(categoryId)
      .then(deleteCatResponse => {
        Logger.log(
          category_module_content.category_delete_success_message,
          JSON.stringify(deleteCatResponse),
        );
        return response
          .status(HttpStatus.NO_CONTENT)
          .send(category_module_content.category_delete_success_message);
      });
  }
}
