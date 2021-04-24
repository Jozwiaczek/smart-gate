import { Injectable } from '@nestjs/common';

type CustomValueParser<SourceType, TargetType> = (valueRaw: SourceType) => TargetType;

@Injectable()
export class EnvConfigService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly config: Record<string, any> = {};

  public get(key: string, required?: true): ReturnType<CustomValueParser<string, string>>;

  public get(
    key: string,
    required: boolean,
  ): ReturnType<CustomValueParser<string | undefined, string | undefined>>;

  public get<T>(
    key: string,
    required: true,
    parser: CustomValueParser<string, T>,
  ): ReturnType<CustomValueParser<string, T>>;

  public get<T>(
    key: string,
    required: boolean,
    parser: CustomValueParser<string, T>,
  ): ReturnType<CustomValueParser<string | undefined, T | undefined>>;

  public get<T>(
    key: string,
    required?: boolean,
    parser?: CustomValueParser<string, T>,
  ): ReturnType<CustomValueParser<string, T>> {
    if (this.config[key] === undefined) {
      const value: string | undefined = process.env[key];

      if (required && value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
      }

      if (value) {
        this.config[key] = parser ? parser(value) : value;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.config[key];
  }
}
