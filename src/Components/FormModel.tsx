import React, { useState } from "react";
import * as Yup from "yup";
import { KTIcon, toAbsoluteUrl } from "../_metronic/helpers";
import { useFormik } from "formik";
import {
  initialUser,
  User,
} from "../app/modules/apps/user-management/users-list/core/_models";
import { UsersListLoading } from "../app/modules/apps/user-management/users-list/components/loading/UsersListLoading";
import clsx from "clsx";

interface FormModelProps {
  user: User;
  setAddModel: (value: boolean) => void;
}
const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
});

const FormModel: React.FC<FormModelProps> = ({ user, setAddModel }) => {
  const [userForEdit] = useState<any>({
    ...user,
    avatar: user?.avatar || initialUser.avatar,
    role: user?.role || initialUser.role,
    position: user?.position || initialUser.position,
    name: user?.name || initialUser.name,
    email: user?.email || initialUser.email,
  });

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setAddModel(false);
      // try {
      //   if (isNotEmpty(values.id)) {
      //     await updateUser(values)
      //   } else {
      //     await createUser(values)
      //   }
      // } catch (ex) {
      //   console.error(ex)
      // } finally {
      //   setSubmitting(true)
      //   cancel(true)
      // }
    },
  });

  const blankImg = toAbsoluteUrl("media/svg/avatars/blank.svg");
  const userAvatarImg = toAbsoluteUrl(`media/${userForEdit.avatar}`);
  return (
    <>
      <div
        className="modal fade show d-block"
        id="kt_modal_add_user"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="fw-bolder">Add User</h2>

              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setAddModel(false);
                }}
              >
                <KTIcon iconName="cross" className="fs-1" />
              </div>
            </div>

            <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
              <form
                id="kt_modal_add_user_form"
                className="form"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <div className="fv-row mb-7">
                  <label className="d-block fw-bold fs-6 mb-5">Avatar</label>

                  <div
                    className="image-input image-input-outline"
                    data-kt-image-input="true"
                    style={{ backgroundImage: `url('${blankImg}')` }}
                  >
                    <div
                      className="image-input-wrapper w-125px h-125px"
                      style={{ backgroundImage: `url('${userAvatarImg}')` }}
                    ></div>

                    {/* begin::Label */}
                    {/* <label
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='Change avatar'
            >
              <i className='bi bi-pencil-fill fs-7'></i>

              <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
              <input type='hidden' name='avatar_remove' />
            </label> */}
                    {/* end::Label */}

                    {/* begin::Cancel */}
                    {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='cancel'
              data-bs-toggle='tooltip'
              title='Cancel avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
                    {/* end::Cancel */}

                    {/* begin::Remove */}
                    {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
                    {/* end::Remove */}
                  </div>
                  {/* end::Image input */}

                  {/* begin::Hint */}
                  {/* <div className='form-text'>Allowed file types: png, jpg, jpeg.</div> */}
                  {/* end::Hint */}
                </div>

                <div className="fv-row mb-7">
                  <label className="required fw-bold fs-6 mb-2">
                    Full Name
                  </label>

                  <input
                    placeholder="Full name"
                    {...formik.getFieldProps("name")}
                    type="text"
                    name="name"
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid": formik.touched.name && formik.errors.name,
                      },
                      {
                        "is-valid": formik.touched.name && !formik.errors.name,
                      }
                    )}
                    autoComplete="off"
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{String(formik.errors.name)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="fv-row mb-7">
                  <label className="required fw-bold fs-6 mb-2">Email</label>

                  <input
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.email && formik.errors.email,
                      },
                      {
                        "is-valid":
                          formik.touched.email && !formik.errors.email,
                      }
                    )}
                    type="email"
                    name="email"
                    autoComplete="off"
                    disabled={formik.isSubmitting}
                  />

                  {formik.touched.email && formik.errors.email && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{String(formik.errors.email)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-7">
                  <label className="required fw-bold fs-6 mb-5">Role</label>

                  <div className="d-flex fv-row">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input me-3"
                        {...formik.getFieldProps("role")}
                        name="role"
                        type="radio"
                        value="Administrator"
                        id="kt_modal_update_role_option_0"
                        checked={formik.values.role === "Administrator"}
                        disabled={formik.isSubmitting}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="kt_modal_update_role_option_0"
                      >
                        <div className="fw-bolder text-gray-800">
                          Administrator
                        </div>
                        <div className="text-gray-600">
                          Best for business owners and company administrators
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="separator separator-dashed my-5"></div>

                  <div className="d-flex fv-row">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input me-3"
                        {...formik.getFieldProps("role")}
                        name="role"
                        type="radio"
                        value="Developer"
                        id="kt_modal_update_role_option_1"
                        checked={formik.values.role === "Developer"}
                        disabled={formik.isSubmitting}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="kt_modal_update_role_option_1"
                      >
                        <div className="fw-bolder text-gray-800">Developer</div>
                        <div className="text-gray-600">
                          Best for developers or people primarily using the API
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="separator separator-dashed my-5"></div>

                  <div className="d-flex fv-row">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input me-3"
                        {...formik.getFieldProps("role")}
                        name="role"
                        type="radio"
                        value="Analyst"
                        id="kt_modal_update_role_option_2"
                        checked={formik.values.role === "Analyst"}
                        disabled={formik.isSubmitting}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="kt_modal_update_role_option_2"
                      >
                        <div className="fw-bolder text-gray-800">Analyst</div>
                        <div className="text-gray-600">
                          Best for people who need full access to analytics
                          data, but don't need to update business settings
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="separator separator-dashed my-5"></div>

                  <div className="d-flex fv-row">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input me-3"
                        {...formik.getFieldProps("role")}
                        name="role"
                        type="radio"
                        value="Support"
                        id="kt_modal_update_role_option_3"
                        checked={formik.values.role === "Support"}
                        disabled={formik.isSubmitting}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="kt_modal_update_role_option_3"
                      >
                        <div className="fw-bolder text-gray-800">Support</div>
                        <div className="text-gray-600">
                          Best for employees who regularly refund payments and
                          respond to disputes
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="separator separator-dashed my-5"></div>

                  <div className="d-flex fv-row">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input me-3"
                        {...formik.getFieldProps("role")}
                        name="role"
                        type="radio"
                        id="kt_modal_update_role_option_4"
                        value="Trial"
                        checked={formik.values.role === "Trial"}
                        disabled={formik.isSubmitting}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="kt_modal_update_role_option_4"
                      >
                        <div className="fw-bolder text-gray-800">Trial</div>
                        <div className="text-gray-600">
                          Best for people who need to preview content data, but
                          don't need to make any updates
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-15">
                  <button
                    type="reset"
                    className="btn btn-light me-3"
                    data-kt-users-modal-action="cancel"
                    disabled={formik.isSubmitting}
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-kt-users-modal-action="submit"
                    disabled={
                      formik.isSubmitting || !formik.isValid || !formik.touched
                    }
                  >
                    <span className="indicator-label">Submit</span>
                    {formik.isSubmitting && (
                      <span className="indicator-progress">
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
              {formik.isSubmitting && <UsersListLoading />}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default FormModel;
