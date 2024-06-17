import React, { useState } from "react";
import * as Yup from "yup";
import { KTIcon, toAbsoluteUrl } from "../_metronic/helpers";
import { useFormik } from "formik";
import { initialUser } from "../app/modules/apps/user-management/users-list/core/_models";
import { UsersListLoading } from "../app/modules/apps/user-management/users-list/components/loading/UsersListLoading";
import clsx from "clsx";

type Props = {
  isUserLoading: boolean;
  user: User;
};

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

const FormModel = ({ user, setAddModel }) => {
  const [userForEdit] = useState<User>({
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
                {/* begin::Input group */}
                <div className="fv-row mb-7">
                  {/* begin::Label */}
                  <label className="d-block fw-bold fs-6 mb-5">Avatar</label>
                  {/* end::Label */}

                  {/* begin::Image input */}
                  <div
                    className="image-input image-input-outline"
                    data-kt-image-input="true"
                    style={{ backgroundImage: `url('${blankImg}')` }}
                  >
                    {/* begin::Preview existing avatar */}
                    <div
                      className="image-input-wrapper w-125px h-125px"
                      style={{ backgroundImage: `url('${userAvatarImg}')` }}
                    ></div>
                    {/* end::Preview existing avatar */}

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
                {/* begin::Input group */}
                <div className="fv-row mb-7">
                  {/* begin::Label */}
                  <label className="required fw-bold fs-6 mb-2">
                    Full Name
                  </label>
                  {/* end::Label */}

                  {/* begin::Input */}
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
                        <span role="alert">{formik.errors.name}</span>
                      </div>
                    </div>
                  )}
                  {/* end::Input */}
                </div>
                {/* end::Input group */}
                {/* end::Input group */}
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
